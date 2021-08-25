(this["webpackJsonpgithub-languages"]=this["webpackJsonpgithub-languages"]||[]).push([[0],{196:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(73),c=a.n(s),i=(a(84),a(36),a(85),a(50)),b=a.n(i),u=a(13),o=a(7),l=a(74),d=a(3),g=a(4),h=a(15),j=a(10),p=a(9),v=a(200),x=a(197),O=a(199),f=a(198),m=a(75),y=a(1),k=function(e){Object(j.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={value:""},n.result={value:""},n.list=[],n.handleChange=n.handleChange.bind(Object(h.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(h.a)(n)),n}return Object(g.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){this.props.passToContainer(this.state.value),e.preventDefault()}},{key:"render",value:function(){var e=this,t=function(){return!0===e.props.isLoading?Object(y.jsx)(v.a,{className:"FieldEntry-input",variant:"secondary",type:"submit",disabled:!0,children:Object(y.jsxs)("div",{children:["Loading...",Object(y.jsx)(x.a,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true"})]})}):Object(y.jsx)(v.a,{className:"FieldEntry-input",variant:"secondary",type:"submit",children:"Submit"})};return Object(y.jsxs)("div",{children:[Object(y.jsx)("header",{className:"App-header",children:Object(y.jsx)("div",{children:Object(y.jsx)("p",{children:"Enter a GitHub username to see a graphical overview of all the languages used across its (public) repositories."})})}),Object(y.jsx)(O.a,{className:"FieldEntry-input",onSubmit:this.handleSubmit,children:Object(y.jsxs)(O.a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[Object(y.jsxs)(f.a,{className:"align-items-center",children:[Object(y.jsx)(m.a,{children:Object(y.jsx)(O.a.Label,{visuallyHidden:!0,children:"GitHub Username"})}),Object(y.jsx)(f.a,{children:Object(y.jsx)(m.a,{children:Object(y.jsx)(O.a.Control,{value:this.state.value,onChange:this.handleChange,type:"text",placeholder:"Enter username"})})})]}),Object(y.jsx)(f.a,{children:Object(y.jsx)(m.a,{children:Object(y.jsx)(t,{})})})]})})]})}}]),a}(r.a.Component),C=a(78),S=function(e){return Object(y.jsx)("div",{className:"Graph-container",children:Object(y.jsx)(C.a,{data:e.data,options:{scale:{ticks:{beginAtZero:!0}}}})})},w=function(e){var t=new Date(1e3*e),a=t.getHours(),n="0"+t.getMinutes(),r="0"+t.getSeconds();function s(e){return(e=e.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/)||[e]).length>1&&((e=e.slice(1))[5]=+e[0]<12?" AM":" PM",e[0]=+e[0]%12||12),e.join("")}return s("18:00:00"),s(a+":"+n.substr(-2)+":"+r.substr(-2))};var A=function(){var e={labels:["JavaScript","Python","Java","Perl","Vue","SQL"],datasets:[{label:"# of bytes written in a language",data:[36314,25975,58461,4543,12345,8e3],backgroundColor:["rgba(245, 122, 151, 0.2)","rgba(110, 148, 245, 0.2)","rgba(245, 173, 135, 0.2)","rgba(135, 245, 151, 0.2)","rgba(153, 102, 255, 0.2)","rgba(245, 217, 147, 0.2)"],borderColor:["rgba(245, 122, 151, 1)","rgba(110, 148, 245, 1)","rgba(245, 173, 135, 1)","rgba(135, 245, 151, 1)","rgba(153, 102, 255, 1)","rgba(245, 217, 147, 1)"],borderWidth:1}]},t=function(e){if(!e.ok){var t="An error has occured: ".concat(e.status);throw p(!1),new Error(t)}},a=function(){var e=Object(l.a)(b.a.mark((function e(a){var n,r,s,c,i,l,d,g,h,j,v,x,O,f,m,y,k,C,S;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,fetch("https://api.github.com/rate_limit",{Accept:"application/vnd.github.v3+json"});case 3:return n=e.sent,t(n),e.next=7,n.json();case 7:if(r=e.sent,console.log("Data rate remaining: ".concat(r.rate.remaining," \n"),"Rate will reset at: ".concat(w(r.rate.reset))),0!==r.rate.remaining){e.next=12;break}return p(!1),e.abrupt("return",alert("GitHub API rate limit exceeded. Please wait till ".concat(w(r.rate.reset)," to try again, or login with your GitHub account to increase your rate limit.")));case 12:return e.next=14,fetch("https://api.github.com/users/".concat(a,"/repos"),{Accept:"application/vnd.github.v3+json"});case 14:return s=e.sent,t(s),e.next=18,s.json();case 18:if(0!==(c=e.sent).length){e.next=22;break}return p(!1),e.abrupt("return",alert("No repositories with detectable languages were found for this username."));case 22:i=[],l=Object(o.a)(c),e.prev=24,l.s();case 26:if((d=l.n()).done){e.next=39;break}return g=d.value,h=g.languages_url,e.next=31,fetch(h,{Accept:"application/vnd.github.v3+json"});case 31:return j=e.sent,t(j),e.next=35,j.json();case 35:j=e.sent,i.push(j);case 37:e.next=26;break;case 39:e.next=44;break;case 41:e.prev=41,e.t0=e.catch(24),l.e(e.t0);case 44:return e.prev=44,l.f(),e.finish(44);case 47:v={},x=0,O=i;case 49:if(!(x<O.length)){e.next=59;break}if(!((f=O[x]).length>0)){e.next=55;break}return e.abrupt("continue",56);case 55:for(m=0,y=Object.entries(f);m<y.length;m++)k=Object(u.a)(y[m],2),C=k[0],S=k[1],void 0!==v[C]?v[C]=v[C]+S:v[C]=S;case 56:x++,e.next=49;break;case 59:return p(!1),e.abrupt("return",v);case 61:case"end":return e.stop()}}),e,null,[[24,41,44,47]])})));return function(t){return e.apply(this,arguments)}}(),r={labels:[],datasets:[{label:"",data:[],backgroundColor:["rgba(245, 122, 151, 0.2)","rgba(110, 148, 245, 0.2)","rgba(245, 173, 135, 0.2)","rgba(135, 245, 151, 0.2)","rgba(153, 102, 255, 0.2)","rgba(245, 217, 147, 0.2)","rgba(280, 90, 151, 0.2)","rgba(50, 148, 245, 0.2)","rgba(245, 200, 90, 0.2)","rgba(90, 230, 151, 0.2)","rgba(180, 102, 255, 0.2)","rgba(245, 200, 110, 0.2)"],borderColor:["rgba(245, 122, 151, 1)","rgba(110, 148, 245, 1)","rgba(245, 173, 135, 1)","rgba(135, 245, 151, 1)","rgba(153, 102, 255, 1)","rgba(245, 217, 147, 1)","rgba(280, 90, 151, 1)","rgba(50, 148, 245, 1)","rgba(245, 200, 90, 1)","rgba(90, 230, 151, 1)","rgba(180, 102, 255, 1)","rgba(245, 200, 110, 1)"],borderWidth:1}]},s=Object(n.useState)(e),c=Object(u.a)(s,2),i=c[0],d=c[1],g=Object(n.useState)(!1),h=Object(u.a)(g,2),j=h[0],p=h[1];return Object(y.jsx)("div",{children:Object(y.jsxs)("div",{className:"App-body",children:[Object(y.jsx)(S,{data:i}),Object(y.jsx)(k,{isLoading:j,passToContainer:function(e){a(e).then((function(e){var t=Object.keys(e),a=Object.values(e);r.labels=t,r.datasets[0].data=a,d(r)})).catch((function(e){return e.message}))}})]})})};var N=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsx)(A,{})})},E=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,201)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),s(e),c(e)}))};c.a.render(Object(y.jsx)(r.a.StrictMode,{children:Object(y.jsx)(N,{})}),document.getElementById("root")),E()},36:function(e,t,a){},84:function(e,t,a){}},[[196,1,2]]]);
//# sourceMappingURL=main.250fd5b0.chunk.js.map