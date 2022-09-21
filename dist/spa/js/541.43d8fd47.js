"use strict";(globalThis["webpackChunkweb"]=globalThis["webpackChunkweb"]||[]).push([[541],{4541:(e,a,l)=>{l.r(a),l.d(a,{default:()=>F});l(8964);var t=l(9835),o=l(499),r=l(6970),u=l(8339),n=l(9302),i=l(786),s=l(1809);const d=(0,s.Q_)("user",{state:()=>({id:-1,username:"",role:""}),getters:{doubleCount:e=>e.role},actions:{setUser(e){const{id:a,username:l,role:t}=e;this.id=a,this.username=l,this.role=t},logout(){console.log("start logout"),this.id=-1,this.username="",this.role=""}}});var c=l(1569);const p=(0,t.Uk)(" Machine Monitor Dashboard "),m={class:"row no-wrap q-pa-md"},b={class:"column items-center"},w={class:"text-subtitle1 q-mt-md q-mb-xs"},g=(0,t._)("div",{class:"text-body1"},"@Copyright",-1),f={__name:"MainLayout",setup(e){const a=(0,u.tv)(),l=(0,n.Z)(),s=d(),f=[{icon:"inbox",label:"Inbox",separator:!0},{icon:"send",label:"Outbox",separator:!1},{icon:"delete",label:"Trash",separator:!1},{icon:"error",label:"Spam",separator:!0},{icon:"settings",label:"Settings",separator:!1},{icon:"feedback",label:"Send Feedback",separator:!1},{icon:"help",iconColor:"primary",label:"Help",separator:!1}],h=(0,o.iH)(!1),_=(0,o.iH)(!1),v=()=>{h.value=!h.value},q=async()=>{l.loading.show({spinner:i.Z});const{data:e}=await c.api.post("/logout",{id:s.id,username:s.username});0==e.code?(s.logout(),setTimeout((()=>{l.loading.hide(),a.replace("/login")}),1e3)):l.notify({type:"negative",message:"Logout failed! Please try again!",position:"center"})};return(e,a)=>{const l=(0,t.up)("q-btn"),u=(0,t.up)("q-toolbar-title"),n=(0,t.up)("q-route-tab"),i=(0,t.up)("q-tabs"),d=(0,t.up)("q-icon"),c=(0,t.up)("q-avatar"),W=(0,t.up)("q-menu"),Z=(0,t.up)("q-toolbar"),Q=(0,t.up)("q-header"),k=(0,t.up)("q-item-section"),y=(0,t.up)("q-item"),x=(0,t.up)("q-separator"),C=(0,t.up)("q-list"),S=(0,t.up)("q-scroll-area"),T=(0,t.up)("q-drawer"),U=(0,t.up)("router-view"),H=(0,t.up)("q-page-container"),L=(0,t.up)("q-footer"),V=(0,t.up)("q-layout"),j=(0,t.Q2)("close-popup"),z=(0,t.Q2)("ripple");return(0,t.wg)(),(0,t.j4)(V,{view:"hHh lpR fFf"},{default:(0,t.w5)((()=>[(0,t.Wm)(Q,{elevated:"",class:"bg-dark text-white","height-hint":"98"},{default:(0,t.w5)((()=>[(0,t.Wm)(Z,null,{default:(0,t.w5)((()=>[(0,t.Wm)(l,{dense:"",flat:"",round:"",icon:"menu",onClick:v}),(0,t.Wm)(u,null,{default:(0,t.w5)((()=>[p])),_:1}),(0,t.Wm)(i,{align:"left"},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{to:"/",label:"Dashboard"}),"admin"==(0,o.SU)(s).role?((0,t.wg)(),(0,t.j4)(n,{key:0,to:"/audit",label:"Login Audit"})):(0,t.kq)("",!0),"admin"==(0,o.SU)(s).role?((0,t.wg)(),(0,t.j4)(n,{key:1,to:"/users",label:"User Management"})):(0,t.kq)("",!0)])),_:1}),(0,t.Wm)(l,{dense:"",flat:"",round:"",icon:"account_circle"},{default:(0,t.w5)((()=>[(0,t.Wm)(W,null,{default:(0,t.w5)((()=>[(0,t._)("div",m,[(0,t._)("div",b,[(0,t.Wm)(c,{size:"60px"},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{name:"account_circle",size:"xl"})])),_:1}),(0,t._)("div",w,(0,r.zw)((0,o.SU)(s).username),1),(0,t.wy)((0,t.Wm)(l,{color:"primary",label:"Logout",push:"",size:"sm",onClick:q},null,512),[[j]])])])])),_:1})])),_:1})])),_:1})])),_:1}),(0,t.Wm)(T,{modelValue:h.value,"onUpdate:modelValue":a[0]||(a[0]=e=>h.value=e),side:"left",width:200,breakpoint:500,overlay:"",bordered:"",class:"bg-grey-3"},{default:(0,t.w5)((()=>[(0,t.Wm)(S,{class:"fit"},{default:(0,t.w5)((()=>[(0,t.Wm)(C,null,{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(f,((e,a)=>((0,t.wg)(),(0,t.iD)(t.HY,{key:a},[(0,t.wy)(((0,t.wg)(),(0,t.j4)(y,{clickable:"",active:"Outbox"===e.label},{default:(0,t.w5)((()=>[(0,t.Wm)(k,{avatar:""},{default:(0,t.w5)((()=>[(0,t.Wm)(d,{name:e.icon},null,8,["name"])])),_:2},1024),(0,t.Wm)(k,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,r.zw)(e.label),1)])),_:2},1024)])),_:2},1032,["active"])),[[z]]),e.separator?((0,t.wg)(),(0,t.j4)(x,{key:"sep"+a})):(0,t.kq)("",!0)],64)))),64))])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,t.Wm)(T,{modelValue:_.value,"onUpdate:modelValue":a[1]||(a[1]=e=>_.value=e),side:"right",bordered:""},null,8,["modelValue"]),(0,t.Wm)(H,null,{default:(0,t.w5)((()=>[(0,t.Wm)(U)])),_:1}),(0,t.Wm)(L,{elevated:"",class:"bg-grey-8 text-white"},{default:(0,t.w5)((()=>[(0,t.Wm)(Z,null,{default:(0,t.w5)((()=>[(0,t.Wm)(u,null,{default:(0,t.w5)((()=>[g])),_:1})])),_:1})])),_:1})])),_:1})}}};var h=l(249),_=l(6602),v=l(1663),q=l(9379),W=l(1973),Z=l(7817),Q=l(3333),k=l(5290),y=l(1357),x=l(2857),C=l(906),S=l(6663),T=l(3246),U=l(490),H=l(1233),L=l(926),V=l(2133),j=l(1378),z=l(2146),D=l(1136),M=l(9984),I=l.n(M);const A=f,F=A;I()(f,"components",{QLayout:h.Z,QHeader:_.Z,QToolbar:v.Z,QBtn:q.Z,QToolbarTitle:W.Z,QTabs:Z.Z,QRouteTab:Q.Z,QMenu:k.Z,QAvatar:y.Z,QIcon:x.Z,QDrawer:C.Z,QScrollArea:S.Z,QList:T.Z,QItem:U.Z,QItemSection:H.Z,QSeparator:L.Z,QPageContainer:V.Z,QFooter:j.Z}),I()(f,"directives",{ClosePopup:z.Z,Ripple:D.Z})}}]);