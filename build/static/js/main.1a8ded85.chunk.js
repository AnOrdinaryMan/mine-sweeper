(window["webpackJsonpmine-sweeper"]=window["webpackJsonpmine-sweeper"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(7),i=n.n(s),o=(n(13),n(1)),l=n(2),u=n(4),c=n(3),m=n(5),h=(n(14),function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(c.a)(t).call(this))).restart=function(){e.init()},e.state={row:10,column:10,mineCount:10,table:[[]],flagCount:0,boomRow:-1,boomColumn:-1},e.timer=0,e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"init",value:function(){var e=this,t=new Array(this.state.row).fill(null);t=t.map(function(){return new Array(e.state.column).fill(null)});for(var n=0;n<t.length;n++)for(var a=0;a<t[n].length;a++){var r=Object.create(null);r.selected=!1,r.hasMine=!1,r.hasFlag=!1,r.number=0,t[n][a]=r}for(var s=this.state.mineCount;s;){var i=Math.floor(Math.random()*this.state.row),o=Math.floor(Math.random()*this.state.column);t[i][o].hasMine||(t[i][o].hasMine=!0,s--)}for(var l=0;l<t.length;l++)for(var u=0;u<t[l].length;u++)if(!t[l][u].hasMine)for(var c=l-1;c<=l+1;c++)for(var m=u-1;m<=u+1;m++)c<0||c>=this.state.row||m<0||m>=this.state.column||t[c][m].hasMine&&(t[l][u].number+=1);this.setState({table:t,flagCount:0,boomRow:-1,boomColumn:-1},function(){console.log(e.state.table)})}},{key:"componentWillMount",value:function(){this.init()}},{key:"onRowChange",value:function(e){var t=this;if(isNaN(parseInt(e.target.value)))this.setState({row:1,mineCount:1},function(){t.init()});else{if(parseInt(e.target.value)>99)return void alert("\u884c\u6570\u4e0d\u80fd\u8d85\u8fc799\uff01");if(0===parseInt(e.target.value))return void alert("\u884c\u6570\u4e0d\u80fd\u4e3a0\uff01");if(String(parseInt(e.target.value)).length!==e.target.value.length)return;this.setState({row:parseInt(e.target.value),mineCount:1},function(){t.init()})}}},{key:"onColumnChange",value:function(e){var t=this;if(isNaN(parseInt(e.target.value)))this.setState({column:1,mineCount:1},function(){t.init()});else{if(parseInt(e.target.value)>99)return void alert("\u5217\u6570\u4e0d\u80fd\u8d85\u8fc799\uff01");if(0===parseInt(e.target.value))return void alert("\u5217\u6570\u4e0d\u80fd\u4e3a0\uff01");if(String(parseInt(e.target.value)).length!==e.target.value.length)return;this.setState({column:parseInt(e.target.value),mineCount:1},function(){t.init()})}}},{key:"onMineCountChange",value:function(e){var t=this;if(isNaN(parseInt(e.target.value)))this.setState({mineCount:1},function(){t.init()});else{if(parseInt(e.target.value)>this.state.row*this.state.column)return void alert("\u96f7\u6570\u4e0d\u80fd\u8d85\u8fc7\u683c\u5b50\u7684\u6570\u91cf\uff01");this.setState({mineCount:parseInt(e.target.value)},function(){t.init()})}}},{key:"ifWin",value:function(e){for(var t=0,n=0;n<e.length;n++)for(var a=0;a<e[n].length;a++)e[n][a].selected&&t++;return t===this.state.row*this.state.column-this.state.mineCount}},{key:"onTouchStart",value:function(e,t,n){var a=this;console.log(e,t);var r=this.state.table;this.timer=setTimeout(function(){!1===r[e][t].selected&&(r[e][t].hasFlag?a.setState({flagCount:a.state.flagCount-1}):a.setState({flagCount:a.state.flagCount+1}),r[e][t].hasFlag=!r[e][t].hasFlag),a.setState({table:r})},500)}},{key:"onTouchEnd",value:function(){clearTimeout(this.timer)}},{key:"onClick",value:function(e,t,n){console.log(e,t);var a=this.state.table;if(2===n.button)!1===a[e][t].selected&&(a[e][t].hasFlag?this.setState({flagCount:this.state.flagCount-1}):this.setState({flagCount:this.state.flagCount+1}),a[e][t].hasFlag=!a[e][t].hasFlag);else if(!1===a[e][t].selected&&!1===a[e][t].hasFlag)if(a[e][t].hasMine){for(var r=0;r<a.length;r++)for(var s=0;s<a[r].length;s++)a[r][s].hasFlag=!1,a[r][s].selected=!0;this.setState({boomRow:e,boomColumn:t}),setTimeout(function(){alert("\ud83d\udca3\ud83d\udca3\ud83d\udca3 Boom \uff01\uff01\uff01")})}else if(0===a[e][t].number?this.fastForward(e,t,a):a[e][t].selected=!0,this.ifWin(a)){for(var i=0;i<a.length;i++)for(var o=0;o<a[i].length;o++)a[i][o].hasFlag=!1,a[i][o].selected=!0;this.setState({flagCount:0}),setTimeout(function(){alert("\ud83d\udea9\ud83d\udea9\ud83d\udea9 Win \uff01\uff01\uff01")})}this.setState({table:a})}},{key:"fastForward",value:function(e,t,n){if(!n[e][t].hasMine&&!n[e][t].selected&&!n[e][t].hasFlag&&(n[e][t].selected=!0,0===n[e][t].number))for(var a=e-1;a<=e+1;a++)for(var r=t-1;r<=t+1;r++)a<0||a>=this.state.row||r<0||r>=this.state.column||this.fastForward(a,r,n)}},{key:"render",value:function(){var e=this,t=this.state.table.map(function(t,n){return r.a.createElement("div",{className:"mine-sweeper-row",key:"row"+n},t.map(function(t,a){return r.a.createElement("div",{className:t.selected?"mine-sweeper-item mine-sweeper-item-selected":"mine-sweeper-item",key:"row"+n+"-column"+a,onMouseUp:function(t){return e.onClick(n,a,t)},onTouchStart:function(t){return e.onTouchStart(n,a,t)},onTouchEnd:function(){return e.onTouchEnd()},style:n===e.state.boomRow&&a===e.state.boomColumn?{backgroundColor:"#F56C6C"}:null},t.hasFlag?"\ud83d\udea9":null,t.selected?t.hasMine?"\ud83d\udca3":r.a.createElement("span",{className:"mine-sweeper-item-number-"+t.number},0!==t.number?t.number:null):null)}))});return r.a.createElement("div",null,r.a.createElement("div",{className:"mine-sweeper-start"},r.a.createElement("span",{className:"mine-sweeper-start-btn",onClick:this.restart},"\u91cd\u65b0\u5f00\u59cb")),r.a.createElement("div",{className:"mine-sweeper-flagCount"},"\ud83d\udea9 X "+this.state.flagCount),r.a.createElement("div",{className:"mine-sweeper-params"},r.a.createElement("span",{className:"mine-sweeper-params-item mine-sweeper-params-item-1"},"\u884c\u6570\uff1a",r.a.createElement("input",{onChange:function(t){return e.onRowChange(t)},value:this.state.row})),r.a.createElement("span",{className:"mine-sweeper-params-item mine-sweeper-params-item-2"},"\u5217\u6570\uff1a",r.a.createElement("input",{onChange:function(t){return e.onColumnChange(t)},value:this.state.column})),r.a.createElement("span",{className:"mine-sweeper-params-item mine-sweeper-params-item-3"},"\u96f7\u6570\uff1a",r.a.createElement("input",{onChange:function(t){return e.onMineCountChange(t)},value:this.state.mineCount}))),r.a.createElement("div",{className:"mine-sweeper",onContextMenu:function(e){e.preventDefault()},style:{width:30*this.state.column,height:30*this.state.row}},t))}}]),t}(r.a.Component)),f=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(h,null)}}]),t}(r.a.Component);i.a.render(r.a.createElement(f,null),document.getElementById("root"))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.1a8ded85.chunk.js.map