import{D as u,c as a,j as n,m as r}from"./chunk-YJVQKGLP.js";var l=(()=>{let s=class s{constructor(){this.suinoDataEmitter$=new a(null),this.suinoPesoDataEmitter$=new a(null),this.suinosDatas=[],this.pesoSuinoDatas=[],this.id_suino="",this.listBrinco=[]}setSuinosDatas(t){t&&(this.suinoDataEmitter$.next(t),this.getSuinosDatas(),this.listBrinco=this.setListabrinco(t))}getSuinosDatas(){return this.suinoDataEmitter$.pipe(r(1),n(t=>t?.filter(i=>i.brinco>0))).subscribe({next:t=>{t&&(this.suinosDatas=t)},error:t=>{console.log(t)}}),this.suinosDatas}getPesoDatas(t){return this.suinoPesoDataEmitter$.pipe(r(1),n(i=>i?.filter(e=>e.id_suino==t))).subscribe({next:i=>{i&&(this.pesoSuinoDatas=i)},error:i=>{console.log(i)}}),this.pesoSuinoDatas}setPesoDatas(t){t&&(this.suinoPesoDataEmitter$.next(t),this.getPesoDatas(this.id_suino))}setIdSuino(t){this.id_suino=t}setListabrinco(t){let i=[];for(let e of t)i.push(e.brinco);return i}};s.\u0275fac=function(i){return new(i||s)},s.\u0275prov=u({token:s,factory:s.\u0275fac,providedIn:"root"});let o=s;return o})();export{l as a};