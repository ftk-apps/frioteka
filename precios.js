/* LISTA ÚNICA DE PRECIOS — las 4 apps leen precios.json (no tocar precios en los .html).
   Si no hay conexión usa la última lista buena guardada en este dispositivo y lo avisa. */
(function(){
  var data=null,origen="red";
  try{
    var x=new XMLHttpRequest();
    x.open("GET","precios.json?v="+Date.now(),false);
    x.send();
    if(x.status===200){data=JSON.parse(x.responseText);try{localStorage.setItem("ftkPrecios",x.responseText);}catch(e){}}
  }catch(e){}
  if(!data){try{data=JSON.parse(localStorage.getItem("ftkPrecios"));origen="guardada";}catch(e){}}
  if(!data){data={lista:{fecha:"?"},P:[],LAC:[],TOGO:[]};origen="ninguna";}
  window.PRECIOS=data;
  function badge(){
    if(!document.body) return;
    var b=document.createElement("div");
    var ok=origen==="red";
    b.textContent=(ok?"Precios al ":origen==="guardada"?"⚠️ Sin conexión · precios guardados del ":"⚠️ No se pudo cargar la lista de precios ")+(data.lista&&data.lista.fecha||"");
    b.style.cssText="position:fixed;left:6px;bottom:4px;z-index:300;font:600 10px/1.4 sans-serif;padding:2px 7px;border-radius:8px;pointer-events:none;"+(ok?"background:rgba(255,255,255,.85);color:#888;":"background:#FFE08A;color:#7a4b00;");
    document.body.appendChild(b);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",badge); else badge();
})();
