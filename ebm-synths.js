/* Studio Niko Music Lab: original Web Audio EBM synthesis engines.
   100% client-side, no samples, third-party libraries or remote processing. */
(() => {
  'use strict';
  const clamp = (x,min,max) => Math.min(max,Math.max(min,Number.isFinite(Number(x))?Number(x):min));
  const SPECS = {
    ebmpulse: {
      name:'PULSE 101',
      presets:[
        {id:'razor',name:'Razor Bass',tone:40,shape:38,decay:38,drive:70},
        {id:'punch',name:'Body Punch',tone:26,shape:18,decay:60,drive:50},
        {id:'sequencer',name:'Machine Sequence',tone:70,shape:68,decay:25,drive:84}
      ]
    },
    ebmmetal: {
      name:'FM HAMMER',
      presets:[
        {id:'iron',name:'Iron Clang',tone:62,shape:55,decay:32,drive:42},
        {id:'factory',name:'Factory Bell',tone:80,shape:85,decay:60,drive:56},
        {id:'impact',name:'Steel Impact',tone:36,shape:38,decay:17,drive:86}
      ]
    },
    ebmdrone: {
      name:'DARK MACHINE',
      presets:[
        {id:'noir',name:'Cold String',tone:44,shape:43,decay:65,drive:36},
        {id:'deep',name:'Sub Drone',tone:18,shape:27,decay:86,drive:62},
        {id:'wide',name:'Dark Horizon',tone:65,shape:75,decay:93,drive:48}
      ]
    }
  };
  const supports=id=>Object.prototype.hasOwnProperty.call(SPECS,id);
  const presets=id=>supports(id)?SPECS[id].presets.map(p=>({id:p.id,name:p.name})):[];
  function presetFor(id,preset){
    if(!supports(id))return null;
    const p=SPECS[id].presets.find(p=>p.id===preset)||SPECS[id].presets[0];
    return {preset:p.id,tone:p.tone,shape:p.shape,decay:p.decay,drive:p.drive};
  }
  function normalize(id,value){
    if(!supports(id))return null;
    const chosen=value&&typeof value==='object'?value:{};
    const base=presetFor(id,chosen.preset);
    return {
      preset:chosen.preset==='custom'?'custom':base.preset,
      tone:clamp(chosen.tone??base.tone,0,100),
      shape:clamp(chosen.shape??base.shape,0,100),
      decay:clamp(chosen.decay??base.decay,0,100),
      drive:clamp(chosen.drive??base.drive,0,100)
    };
  }
  function trigger({ctx,out,track,note,velocity,when,stepDuration,state,trackSource}){
    if(!supports(track.id))return;
    const s=normalize(track.id,track.synth);
    const tone=s.tone/100,shape=s.shape/100,decay=s.decay/100,drive=s.drive/100;
    const freq=440*Math.pow(2,(clamp(note,24,96)-69)/12),vel=clamp(velocity,1,127)/127;
    const pulse=track.id==='ebmpulse',metal=track.id==='ebmmetal';
    const attack=pulse?.003:metal?.002:.07+decay*.13;
    const hold=pulse?stepDuration*(.4+decay*.9):metal?stepDuration*(.2+decay*1.35):stepDuration*(2+decay*5);
    const release=pulse?.065+decay*.27:metal?.07+decay*.4:.36+decay*1.0;
    const total=Math.max(attack+.02,hold)+release;
    const input=ctx.createGain(),filter=ctx.createBiquadFilter(),amp=ctx.createGain();
    const globalCut=clamp(state.cutoff,120,12000)/2200;
    const baseCut=clamp((180+tone*tone*9800)*Math.sqrt(globalCut),120,16500);
    filter.type=metal?'bandpass':'lowpass';
    filter.Q.value=clamp((metal?1.0:0.65)+shape*4.4+clamp(state.resonance,0,18)*.27,.2,18);
    filter.frequency.setValueAtTime(Math.min(17000,baseCut*(pulse?2.6:1.3)),when);
    filter.frequency.exponentialRampToValueAtTime(Math.max(120,baseCut*(pulse?.42:metal?.78:.8)),when+Math.min(total*.78,.85));
    input.connect(filter);
    const amount=clamp(drive*.85+clamp(state.drive,0,1)*.3,0,1);
    if(amount>.03){
      const shaper=ctx.createWaveShaper(),curve=new Float32Array(1024);
      const k=1+amount*110;
      for(let i=0;i<curve.length;i++){
        const x=i*2/(curve.length-1)-1;
        curve[i]=((1+k)*x)/(1+k*Math.abs(x));
      }
      shaper.curve=curve;shaper.oversample='2x';
      filter.connect(shaper);shaper.connect(amp);
    }else filter.connect(amp);
    amp.connect(out);
    const gain=(pulse?.31:metal?.24:.19)*vel;
    amp.gain.setValueAtTime(.0001,when);
    amp.gain.linearRampToValueAtTime(Math.max(.0002,gain),when+attack);
    amp.gain.setValueAtTime(Math.max(.0002,gain*.72),when+hold);
    amp.gain.exponentialRampToValueAtTime(.0001,when+total);
    const makeOsc=(type,hz,mix,detune=0)=>{
      const o=trackSource(ctx.createOscillator()),g=ctx.createGain();
      o.type=type;o.frequency.setValueAtTime(Math.max(15,hz),when);o.detune.value=detune;g.gain.value=mix;
      o.connect(g);g.connect(input);o.start(when);o.stop(when+total+.02);
      return o;
    };
    if(pulse){
      makeOsc('sawtooth',freq,.54);
      makeOsc('square',freq,.24+shape*.14,shape*13);
      makeOsc('triangle',freq/2,.27);
    }else if(metal){
      const carrier=trackSource(ctx.createOscillator()),modulator=trackSource(ctx.createOscillator());
      const fmDepth=ctx.createGain(),carrierGain=ctx.createGain();
      const ratio=1.4+shape*6.1;
      carrier.type='sine';carrier.frequency.setValueAtTime(freq,when);
      modulator.type='sine';modulator.frequency.setValueAtTime(freq*ratio,when);
      fmDepth.gain.setValueAtTime(freq*(.3+shape*5.5),when);
      fmDepth.gain.exponentialRampToValueAtTime(Math.max(1,freq*.06),when+Math.max(.05,hold*.75));
      modulator.connect(fmDepth);fmDepth.connect(carrier.frequency);
      carrierGain.gain.value=.9;carrier.connect(carrierGain);carrierGain.connect(input);
      carrier.start(when);modulator.start(when);
      carrier.stop(when+total+.02);modulator.stop(when+total+.02);
      makeOsc('triangle',freq*1.5,.12,-4);
    }else{
      const spread=4+shape*24;
      makeOsc('sawtooth',freq,.39,-spread);
      makeOsc('sawtooth',freq,.39,spread);
      makeOsc('triangle',freq/2,.31);
    }
  }
  window.NikoEBM={supports,presets,presetFor,normalize,trigger};
})();
