import{a as L}from"./chunk-R3LL2YX6.js";import{a as E}from"./chunk-SXK2Z643.js";import{a as V}from"./chunk-BJ6UHTC5.js";import{a as fe,b as ve,c as ge,d as _e,e as be,f as xe,g as Ee,h as ye,i as we,j as Ce,k as Me,l as De,m as Ie,n as Fe,o as Te}from"./chunk-EBXKZ3ZL.js";import{a as de,b as le}from"./chunk-H3KFRSHM.js";import{b as me,c as pe,d as Se,e as j,f as he}from"./chunk-UT2CUAHE.js";import{$a as H,A as g,Aa as x,Da as y,E as W,Ea as w,Eb as A,Fa as C,Fb as z,Gb as J,Hb as Z,Ia as I,Jb as K,Kb as p,Mb as Q,Nb as X,Pb as Y,Qb as ee,R as a,Rb as te,S,Sb as ie,Tb as oe,Ub as ne,ac as P,b as F,ca as N,ea as l,ec as O,fb as G,ha as U,ic as re,ja as o,ka as n,kb as $,la as c,lc as se,mc as ae,pa as D,qa as _,r as b,ra as h,tc as ue,u as T,uc as B,vc as ce,w as M,x as q,z as v,za as m}from"./chunk-YJVQKGLP.js";import"./chunk-CQCHLVVT.js";function qe(d,s){if(d&1){let r=D();o(0,"div")(1,"form",1),_("ngSubmit",function(){v(r);let t=h();return g(t.handleSubmitAddSuino())}),o(2,"div",2),c(3,"input",3)(4,"input",4)(5,"input",5)(6,"input",6)(7,"input",7),o(8,"p-dropdown",8),C("ngModelChange",function(t){v(r);let i=h();return w(i.selectedStatus,t)||(i.selectedStatus=t),g(t)}),n(),o(9,"p-dropdown",9),C("ngModelChange",function(t){v(r);let i=h();return w(i.selectedSexo,t)||(i.selectedSexo=t),g(t)}),n(),o(10,"div",10),c(11,"p-button",11),n()()()()}if(d&2){let r=h();a(),l("formGroup",r.addSuinoForm),a(7),l("options",r.status_suino),y("ngModel",r.selectedStatus),a(),l("options",r.sexo_suino),y("ngModel",r.selectedSexo),a(2),l("disabled",!r.addSuinoForm.valid)}}function We(d,s){if(d&1){let r=D();o(0,"div")(1,"form",1),_("ngSubmit",function(){v(r);let t=h();return g(t.handleEditSuino())}),o(2,"div",2),c(3,"input",3)(4,"input",4)(5,"input",5)(6,"input",6)(7,"input",7),o(8,"p-dropdown",8),C("ngModelChange",function(t){v(r);let i=h();return w(i.selectedStatus,t)||(i.selectedStatus=t),g(t)}),n(),o(9,"p-dropdown",9),C("ngModelChange",function(t){v(r);let i=h();return w(i.selectedSexo,t)||(i.selectedSexo=t),g(t)}),n(),o(10,"div",10),c(11,"p-button",11),n()()()()}if(d&2){let r=h();a(),l("formGroup",r.editSuinoForm),a(7),l("options",r.status_suino),y("ngModel",r.selectedStatus),a(),l("options",r.sexo_suino),y("ngModel",r.selectedSexo),a(2),l("disabled",!r.editSuinoForm.valid)}}var Pe=(()=>{let s=class s{constructor(e,t,i,u,f,k){this.suinosService=e,this.messageService=t,this.formBuilder=i,this.router=u,this.ref=f,this.suinosDtService=k,this.destroy$=new F,this.status_suino=["Ativo","Vendido","Morto"],this.sexo_suino=["F","M"],this.selectedStatus="",this.selectedSexo="",this.suinosDatas=[],this.suinosListDatas=[],this.historicoPesoGet=[],this.addSuinoForm=this.formBuilder.group({brinco:["",p.required],brincoPai:["",p.required],brincoMae:["",p.required],dataNascimento:["",p.required],dataSaida:["",p.required],status:["",p.required],sexo:["",p.required]}),this.editSuinoForm=this.formBuilder.group({brinco:["",p.required],brincoPai:["",p.required],brincoMae:["",p.required],dataNascimento:["",p.required],dataSaida:["",p.required],status:["",p.required],sexo:["",p.required]}),this.addSuinoEvent=E.ADD_SUINO_EVENT,this.editSuinoEvent=E.EDIT_SUINO_EVENT,this.historicSuinoEvent=E.HISTORIC_SUINO_EVENT,this.brinco_id_get=0}ngOnInit(){this.suinoAction=this.ref.data,this.suinoAction?.event?.action==this.editSuinoEvent&&this.getSuinoSelectedDatas(this.suinoAction?.event?.id),this.getAllSuinos()}getAllSuinos(){this.suinosService.getAllSuinos().pipe(b(this.destroy$)).subscribe({next:e=>{e.length>0&&(this.suinosDatas=e)},error:e=>{console.log(e),this.router.navigate(["/dashboard"]),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao buscar animais",life:2500})}})}handleSubmitAddSuino(){if(this.addSuinoForm?.value&&this.addSuinoForm?.valid){let e=Number(this.addSuinoForm.value?.brinco);if(this.suinosDatas.some(i=>i.brinco===e))this.messageService.add({severity:"error",summary:"Erro",detail:"O brinco j\xE1 foi adicionado anteriormente.",life:3e3});else{let i={brinco:Number(this.addSuinoForm.value?.brinco),brincoPai:Number(this.addSuinoForm.value?.brincoPai),brincoMae:Number(this.addSuinoForm.value?.brincoMae),dataNascimento:this.addSuinoForm.value?.dataNascimento,dataSaida:this.addSuinoForm.value?.dataSaida,status:this.addSuinoForm.value?.status,sexo:this.addSuinoForm.value?.sexo};console.log("Add suino",i),this.suinosService.addSuino(i).pipe().subscribe({next:u=>{u&&this.messageService.add({severity:"success",summary:"Sucesso",detail:"Suino adicionado com sucesso!",life:2500})},error:u=>{console.log(u),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao adicionar suino",life:2e3})}})}}this.addSuinoForm.reset()}handleEditSuino(){if(this.editSuinoForm?.value&&this.editSuinoForm?.valid&&this.suinoAction.event.id){let e=Number(this.editSuinoForm.value?.brinco);if(this.brinco_id_get===e)this.messageService.add({severity:"error",summary:"Erro",detail:"O brinco j\xE1 foi adicionado anteriormente.",life:3e3});else{let t={brinco:Number(this.editSuinoForm?.value.brinco),brincoPai:Number(this.editSuinoForm?.value.brincoPai),brincoMae:Number(this.editSuinoForm?.value.brincoMae),dataNascimento:this.editSuinoForm?.value.dataNascimento,dataSaida:this.editSuinoForm?.value.dataSaida,status:this.editSuinoForm?.value.status,sexo:this.editSuinoForm?.value.sexo,historicoPeso:this.historicoPesoGet};this.suinosService.editSuino(t,this.suinoAction.event.id).pipe(b(this.destroy$)).subscribe({next:()=>{this.messageService.add({severity:"sucess",summary:"Sucesso",detail:"Suino editado com sucesso",life:2500}),this.editSuinoForm.reset()},error:i=>{console.log(i),this.router.navigate(["/dashboard"]),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao buscar animais",life:2500})}})}}}getSuinoSelectedDatas(e){let t=this.ref.data.suinosList;if(this.ref.data.suinosList&&this.ref.data.suinosList.length>0){let i=t.filter(u=>u.id===e);console.log("Suino filter",i),i&&(this.suinoSelectedDatas=i[0],console.log("Suino",this.suinoSelectedDatas),this.brinco_id_get=this.suinoSelectedDatas?.brinco,this.historicoPesoGet=this.suinoSelectedDatas.historicoPeso,this.editSuinoForm.setValue({brinco:this.suinoSelectedDatas?.brinco.toString(),brincoPai:this.suinoSelectedDatas?.brincoPai.toString(),brincoMae:this.suinoSelectedDatas?.brincoMae.toString(),dataNascimento:this.suinoSelectedDatas?.dataNascimento,dataSaida:this.suinoSelectedDatas?.dataSaida,status:this.suinoSelectedDatas?.status,sexo:this.suinoSelectedDatas?.sexo}))}}getSuinoDtas(){this.suinosService.getAllSuinos().pipe(b(this.destroy$)).subscribe({next:e=>{e.length>0&&(this.suinosListDatas=e,this.suinosListDatas&&this.suinosDtService.setSuinosDatas(this.suinosListDatas))},error:e=>{console.log(e),this.router.navigate(["/dashboard"]),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao buscar animais",life:2500})}})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};s.\u0275fac=function(t){return new(t||s)(S(V),S(O),S(ie),S(A),S(pe),S(L))},s.\u0275cmp=M({type:s,selectors:[["app-suino-form"]],decls:2,vars:2,consts:[[4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"card","flex","flex-column","md:flex-column","gap-3"],["pInputText","","placeholder","N\xFAmero do brinco","formControlName","brinco"],["pInputText","","placeholder","Brinco do Pai","formControlName","brincoPai"],["pInputText","","placeholder","Brinco de Mae","formControlName","brincoMae"],["pInputText","","type","date","placeholder","Data de Nascimento","formControlName","dataNascimento"],["pInputText","","type","date","placeholder","Data de Sa\xEDda","formControlName","dataSaida"],["styleClass","w-full","placeholder","Status do animal","formControlName","status",3,"options","ngModel","ngModelChange"],["styleClass","w-full","placeholder","Sexo do animal","formControlName","sexo",3,"options","ngModel","ngModelChange"],[1,"flex","flex-row","justify-content-center","align-content-center","align-items-center","m-1"],["type","submit","label","Concluir",3,"disabled"]],template:function(t,i){t&1&&N(0,qe,12,6,"div",0)(1,We,12,6,"div",0),t&2&&(l("ngIf",i.ref.data.event.action===i.addSuinoEvent),a(),l("ngIf",i.ref.data.event.action===i.editSuinoEvent))},dependencies:[H,Y,K,Q,X,ee,te,B,de,ge],encapsulation:2});let d=s;return d})();function Ue(d,s){if(d&1){let r=D();o(0,"tr")(1,"th",7)(2,"div",8)(3,"div",8),m(4," Brinco "),n(),o(5,"div",8),c(6,"p-sortIcon",9)(7,"p-columnFilter",10),n()()(),o(8,"th",11)(9,"div",8)(10,"div",8),m(11," Brinco M\xE3e "),n(),o(12,"div",8),c(13,"p-sortIcon",12)(14,"p-columnFilter",13),n()()(),o(15,"th",14)(16,"div",8)(17,"div",8),m(18," Brinco Pai "),n(),o(19,"div",8),c(20,"p-sortIcon",15)(21,"p-columnFilter",16),n()()(),o(22,"th",17)(23,"div",8)(24,"div",8),m(25," Data Nascimento "),n(),o(26,"div",8),c(27,"p-sortIcon",18)(28,"p-columnFilter",19),n()()(),o(29,"th",20)(30,"div",8)(31,"div",8),m(32," Data Saida "),n(),o(33,"div",8),c(34,"p-sortIcon",21)(35,"p-columnFilter",22),n()()(),o(36,"th",23)(37,"div",8)(38,"div",8),m(39," Sexo "),n(),o(40,"div",8),c(41,"p-sortIcon",24)(42,"p-columnFilter",25),n()()(),o(43,"th",26)(44,"div",8)(45,"div",8),m(46," Status "),n(),o(47,"div",8),c(48,"p-sortIcon",27)(49,"p-columnFilter",28),n()()(),o(50,"div",29)(51,"p-button",30),_("onClick",function(){v(r);let t=h();return g(t.handleSuinoEvent(t.addSuinoEvent))}),n()()()}d&2&&(a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1),a(7),l("showMatchModes",!1)("showOperator",!1)("showAddButton",!1))}function He(d,s){if(d&1){let r=D();o(0,"tr")(1,"td"),m(2),n(),o(3,"td"),m(4),n(),o(5,"td"),m(6),n(),o(7,"td"),m(8),n(),o(9,"td"),m(10),n(),o(11,"td"),m(12),n(),o(13,"td"),m(14),n(),o(15,"td")(16,"div",31)(17,"button",32),_("click",function(){let i=v(r).$implicit,u=h();return g(u.handlePesoEvent(u.historicSuinoEvent,i==null?null:i.id))}),n(),o(18,"button",33),_("click",function(){let i=v(r).$implicit,u=h();return g(u.handleSuinoEvent(u.editSuinoEvent,i==null?null:i.id))}),n(),o(19,"button",34),_("click",function(){let i=v(r).$implicit,u=h();return g(u.handleDeleteSuino(i==null?null:i.id,i==null?null:i.brinco))}),n()()()()}if(d&2){let r=s.$implicit;a(2),x(r.brinco),a(2),x(r.brincoMae),a(2),x(r.brincoPai),a(2),x(r.dataNascimento),a(2),x(r.dataSaida),a(2),x(r.sexo),a(2),x(r.status)}}var Ge=()=>["brinco","brincoMae","brincoPai"],$e=()=>({"min-width":"75rem"}),Oe=(()=>{let s=class s{constructor(){this.suinos=[],this.suinosEvent=new T,this.deletsuinosEvent=new T,this.EventActionPeso=new T,this.addSuinoEvent=E.ADD_SUINO_EVENT,this.editSuinoEvent=E.EDIT_SUINO_EVENT,this.historicSuinoEvent=E.HISTORIC_SUINO_EVENT}handleSuinoEvent(e,t){if(e&&e!==""){let i=t&&t!==""?{action:e,id:t}:{action:e};console.log("suinoEventData",i),this.suinosEvent.emit(i)}}handlePesoEvent(e,t){if(t&&t!==" "){let i={action:e,suino_id:t};console.log("suinoEventDataPeso",i),this.EventActionPeso.emit(i)}}handleDeleteSuino(e,t){e!==""&&t!==""&&this.deletsuinosEvent.emit({id:e,brincoSuino:t})}};s.\u0275fac=function(t){return new(t||s)},s.\u0275cmp=M({type:s,selectors:[["app-suino-table"]],inputs:{suinos:"suinos"},outputs:{suinosEvent:"suinosEvent",deletsuinosEvent:"deletsuinosEvent",EventActionPeso:"EventActionPeso"},decls:7,vars:11,consts:[[1,"grid"],[1,"col-12"],["header","Animais na Produ\xE7\xE3o","styleClass","shadow-3 m-5 text-indigo-800"],["data","id","currentPageReportTemplate","Mostrando {first} de {last} de animais",3,"value","rows","paginator","responsive","globalFilterFields","tableStyle","selection","rowHover","showCurrentPageReport","selectionChange"],["suinoTable",""],["pTemplate","header"],["pTemplate","body"],["pSortableColumn","brinco"],[1,"flex","justify-content-between","align-items-center"],["field","brinco"],["type","text","field","brinco","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","brincoMae"],["field","brincoMae"],["type","text","field","brincoMae","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","brincopai"],["field","brincopai"],["type","text","field","brincopai","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","dataNascimento"],["field","dataNascimento"],["type","text","field","dataNascimento","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","dataSaida"],["field","dataSaida"],["type","text","field","dataSaida","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","sexo"],["field","sexo"],["type","text","field","sexo","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],["pSortableColumn","status"],["field","status"],["type","text","field","status","display","menu","matchMode","contains",3,"showMatchModes","showOperator","showAddButton"],[1,"flex","justify-content-center"],["styleClass","p-button-info","icon","pi pi-plus","label","Adicionar","pTooltip","Adicionar produto","tooltipPosition","top",3,"onClick"],[1,"flex","justify-content-center","grap-3","align-content-center","align-items-center"],["pButton","","pRipple","","icon","pi pi-history","pTooltip","Historico do peso","tooltipPosition","top","routerLink","/historico","routerLinkActive","exact_route",1,"p-button-secondary",3,"click"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Editar","tooltipPosition","top",1,"p-button-secondary",3,"click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Remover","tooltipPosition","top",1,"p-button-danger",3,"click"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"div",1)(2,"p-card",2)(3,"p-table",3,4),C("selectionChange",function(f){return w(i.suinoSelected,f)||(i.suinoSelected=f),f}),N(5,Ue,52,21,"ng-template",5)(6,He,20,7,"ng-template",6),n()()()()),t&2&&(a(3),l("value",i.suinos)("rows",10)("paginator",!0)("responsive",!0)("globalFilterFields",I(9,Ge))("tableStyle",I(10,$e)),y("selection",i.suinoSelected),l("rowHover",!0)("showCurrentPageReport",!0))},dependencies:[z,J,se,re,ue,B,xe,Ee,ye,we,fe],encapsulation:2});let d=s;return d})();var Je=()=>({with:"50ve"}),Be=(()=>{let s=class s{constructor(e,t,i,u,f,k){this.suinosService=e,this.messageService=t,this.suinosDtService=i,this.router=u,this.confirmationService=f,this.dialogService=k,this.destroy$=new F,this.suinosList=[]}ngOnInit(){this.getServiceSuinosDt()}getServiceSuinosDt(){let e=this.suinosDtService.getSuinosDatas();e.length>0?this.suinosList=e:this.getAPISuinoDtas(),console.log("DADOS DOS SUINOS",this.suinosList)}getAPISuinoDtas(){this.suinosService.getAllSuinos().pipe(b(this.destroy$)).subscribe({next:e=>{e.length>0&&(this.suinosList=e)},error:e=>{console.log(e),this.router.navigate(["/dashboard"]),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao buscar animais",life:2500})}})}handleSuinoEvent(e){e&&(this.ref=this.dialogService.open(Pe,{header:e?.action,width:"70%",contentStyle:{overflow:"auto"},baseZIndex:1e4,maximizable:!0,data:{event:e,suinosList:this.suinosList}}),this.ref.onClose.pipe(b(this.destroy$)).subscribe({next:()=>this.getAPISuinoDtas()}))}handlePesoEvent(e){this.suinosDtService.setIdSuino(e.suino_id)}handleDeleteSuino(e){e&&this.confirmationService.confirm({message:`Confirma a exclus\xE3o do Suino de numera\xE7\xE3o: ${e?.brincoSuino}?`,header:"Confirma\xE7\xE3o de exclus\xE3o",icon:"pi pi-exclamation-triangle",acceptLabel:"Sim",rejectLabel:"N\xE3o",accept:()=>this.deleteSuino(e?.id)})}deleteSuino(e){e&&this.suinosService.deleteSuino(e).pipe(b(this.destroy$)).subscribe({next:t=>{t&&this.messageService.add({severity:"success",summary:"Sucesso",detail:"Suino removido com sucesso!",life:2500}),this.getAPISuinoDtas()},error:t=>{console.log(t),this.messageService.add({severity:"error",summary:"Erro",detail:"Erro ao deletar Suino",life:2e3})}})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};s.\u0275fac=function(t){return new(t||s)(S(V),S(O),S(L),S(A),S(P),S(j))},s.\u0275cmp=M({type:s,selectors:[["app-suino-home"]],decls:3,vars:4,consts:[[3,"suinos","suinosEvent","EventActionPeso","deletsuinosEvent"]],template:function(t,i){t&1&&(c(0,"app-toolbar-navigation"),o(1,"app-suino-table",0),_("suinosEvent",function(f){return i.handleSuinoEvent(f)})("EventActionPeso",function(f){return i.handlePesoEvent(f)})("deletsuinosEvent",function(f){return i.handleDeleteSuino(f)}),n(),c(2,"p-confirmDialog")),t&2&&(a(),l("suinos",i.suinosList),a(),U(I(3,Je)))},dependencies:[me,Fe,Oe]});let d=s;return d})();var Ve=[{path:"",component:Be}];var Ut=(()=>{let s=class s{};s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=q({type:s}),s.\u0275inj=W({providers:[j,P],imports:[G,oe,ne,Z.forChild(Ve),he,$,ae,ce,Ce,Me,De,le,Ie,be,Se,_e,Te,ve]});let d=s;return d})();export{Ut as SuinosModule};
