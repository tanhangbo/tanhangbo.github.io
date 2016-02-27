

var width_changed = 0;
var pc_browser = 0;

// 百度地图API功能	
map = new BMap.Map("allmap");
map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
map.enableKeyboard();//启动键盘操作地图
map.addControl(new BMap.NavigationControl());    
map.addControl(new BMap.MapTypeControl());    

/*全景*/
var stCtrl = new BMap.PanoramaControl();  
stCtrl.setOffset(new BMap.Size(40, 60));  
map.addControl(stCtrl);


map.centerAndZoom(new BMap.Point(120.15262,30.250418), 15);

var opts = {
			width : 250,     // 信息窗口宽度
			height: 80,     // 信息窗口高度
			title : "" , // 信息窗口标题
			enableMessage:true//设置允许信息窗发送短息
		   };

var p = navigator.platform;
if ((p.indexOf("Win") == 0) || (p.indexOf("Mac") == 0) ||
       (1 == (p == "X11")) || (p.indexOf("Linux") == 0)) {
	pc_browser = 1;
} else {
	pc_browser = 0;
}
		   
if (pc_browser) {
	document.getElementById("info_iframe").src = "info/杭州简介.html";
} else {
	document.getElementById("info_window_top").style.display = "none";
	document.getElementById("info_window").style.display = "none";
}
   
for(var i=0;i<data_info.length;i++){

/*	
	//try
	marker1 = addCustomMarker(new BMap.Point(data_info[i][0],data_info[i][1]));
	var content = data_info[i];//data_info[i][3];
	addClickHandler(content,marker1);
*/
	var marker;
	/* Two ways to create marker */
	if (data_info[i][3])
		marker = addCustomMarker(new BMap.Point(data_info[i][0],data_info[i][1]));
	else
		marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));

	var label = new BMap.Label(data_info[i][2],{offset:new BMap.Size(20,-10)});
	marker.setLabel(label);
	map.addOverlay(marker);               // 将标注添加到地图中
	
	var content = data_info[i];
	
	if (pc_browser)
		addClickHandler(content,marker);

}
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
			openInfo(content,e)
		}
	);
}
function openInfo(content,e){


	//document.getElementById("info_window").innerHTML = info_content;
	
	set_default_width();
	if (content[3])
		document.getElementById("info_iframe").src = "info/" + content[3] + ".html";

/*	
	var p = e.target;
	opts.title = "<b>" + content[2] + "</b>";
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	
	var info_content = content[3];
	if (content[4])
		info_content = info_content + "<br /><a target=_blank href=\"" + content[4] + "\">点击打开</a>";
		
	var infoWindow = new BMap.InfoWindow(info_content, opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
*/
	
}

function addCustomMarker(point){  // 创建图标对象   
	var myIcon = new BMap.Icon("image/2.png", new BMap.Size(100, 100), {    
	// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
	// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
   // 图标中央下端的尖角位置。    
   offset: new BMap.Size(10, 25),    
	});      
	// 创建标注对象并添加到地图   
	var marker = new BMap.Marker(point, {icon: myIcon});    
	map.addOverlay(marker);    
	
	return marker;
}    


function show_hide() {
	var handle = document.getElementById("info_window").style;
	if (handle.display == "none")
		handle.display = "block";
	else
		handle.display = "none";


}

function change_width() {

	
	if (width_changed == 0)
		set_extended_width();
	else
		set_default_width();

	width_changed = 1 -	width_changed;

}

function set_default_width() {
	var handle_main = document.getElementById("info_window").style;
	var handle_top = document.getElementById("info_window_top").style;
	handle_main.width = "300px";
	handle_top.width = "300px";
}

function set_extended_width() {
	var handle_main = document.getElementById("info_window").style;
	var handle_top = document.getElementById("info_window_top").style;
	handle_main.width = "800px";
	handle_top.width = "800px";
}


