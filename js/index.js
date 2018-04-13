/*
* @Author: Administrator
* @Date:   2018-03-24 08:14:35
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-08 16:29:12
*/
	
var weather=null;
var citys=null;
var flag=false;	
$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=杭州",
		dataType:"JSONP",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			
		}
	});
$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"JSONP",
		type:"get",
		success:function(obj){
			
			citys=obj.data;
		}
	});
	
function ajax(str){
	var url1="https://www.toutiao.com/stream/widget/local_weather/data/?city="+str;
	$.ajax({
		
		url:url1,
		dataType:"JSONP",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			// console.log(weather);
			updata();
		}
	});
}


window.onload=function(){
	
	updata();
	var hot_citys=document.getElementsByClassName('hot_citys');
	// var hot_citys_lis=hot_citys.getElementsByTagName('li');
	// for(var m=0;m<hot_citys.length;m++){	
	// hot_citys[m].onclick=function(e){
	// 	var cityh=e.target.innerHTML;
	// 	ajax(cityh);
	// 	var locations=document.getElementById("location");
	// 	locations.style.display='none';
	// }
	// }
	$('.hot_citys li').on('click',function() {
		  // var scroll=document.getElementsByClassName('scroll')[0];
		  // var scroll1=document.getElementsByClassName('scroll1')[0];
		  // //每次点击获取城市之前，清空之前获取的数据
		  // scroll.innerHTML='';
		  // scroll1.innerHTML='';
		  clear();
		var cityh=this.innerHTML;
		// console.log(this.innerHTML);
		ajax(cityh);
		var locations=document.getElementById("location");
	locations.style.display='none';
	});
	
}
function clear(){
	var scroll=document.getElementsByClassName('scroll')[0];
		  var scroll1=document.getElementsByClassName('scroll1')[0];
		  //每次点击获取城市之前，清空之前获取的数据
		  scroll.innerHTML='';
		  scroll1.innerHTML='';
}
function updata(){
//获取城市
	var city=document.getElementById("city");
	//获取温度
	var tem=document.getElementById("tem");
	//获取天气
	var con=document.getElementById("con");
	//获取温度情况
	var temp=document.getElementsByClassName('temperature');
	//获取最高温度和最低温度
	var hight=temp[0].getElementsByTagName('i')[0];
	var low=temp[0].getElementsByTagName('i')[1];
	var hight1=temp[1].getElementsByTagName('i')[0];
	var low1=temp[1].getElementsByTagName('i')[1];
	//获取天气情况
	var weather1=document.getElementsByClassName('weather')[0];
	var weather2=document.getElementsByClassName('weather')[1];
	//获取图片
	var imgs=document.getElementsByClassName('img');
	// alert(weather.dat_weather_icon_id);
	imgs[0].style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;
	imgs[1].style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
	// imgs[0].style.backgroundImage="../img/1.png";
	//赋值语句
	// var weather_dat_day
	if(weather.dat_condition==weather.day_condition){
		weather_dat_day=weather.dat_condition;
	}else{
		weather_dat_day=weather.dat_condition+'转'+weather.day_condition;
	}
	 weather1.innerHTML=weather_dat_day;
	 weather2.innerHTML=weather.tomorrow_condition;
	hight.innerHTML=weather.dat_high_temperature;
	low.innerHTML=weather.dat_low_temperature;
	hight1.innerHTML=weather.tomorrow_high_temperature;
	low1.innerHTML=weather.tomorrow_low_temperature;
	city.innerHTML=weather.city_name+'市';
	tem.innerHTML=weather.current_temperature+'°';
	con.innerHTML=weather.current_condition;
	//循环遍历接口中的数据
	for(var i in weather.hourly_forecast){
		// console.log(weather);
		//创建元素
		var now=document.createElement('div');
		var now_time=document.createElement('p');
		var now_img=document.createElement('div');
		var now_temp=document.createElement('p');
		now.className='now';
		now_time.className='now_time';
		now_img.className='now_img';
		now_temp.className='now_temp';
		//添加数据
		 now_time.innerHTML=weather.hourly_forecast[i].hour+':00';
		 now_temp.innerHTML=weather.hourly_forecast[i].temperature+'°';
		 //添加图片
		 now_img.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
		
		now.appendChild(now_time);
		now.appendChild(now_img);
		now.appendChild(now_temp);
		var scroll=document.getElementsByClassName('scroll')[0];

		scroll.appendChild(now);
		
		

	}
	// console.log(weather.forecast_list[0].date);
	
	for(var j in weather.forecast_list){
		//创建元素
		var week=document.createElement('div');
		week.className='week';

		var week_date=document.createElement('div');
		week_date.className='week_date';
		var str=weather.forecast_list[j].date;
		var str1=str.substring(5,7);
		var str2=str.substring(8,10);
		var span1=document.createElement('span');
		span1.innerHTML=str1;
		var span2=document.createElement('span');
		span2.innerHTML='/';
		var span3=document.createElement('span');
		span3.innerHTML=str2;
		week_date.appendChild(span1);
		week_date.appendChild(span2);
		week_date.appendChild(span3);
		var str=weather.forecast_list[0].date;
		var str1=str.substring(5,7);
		var str2=str.substring(8,10);

		var week_weaH=document.createElement('div');
		week_weaH.className='week_weaH';
		week_weaH.innerHTML=weather.forecast_list[j].condition;

		var week_imgH=document.createElement('div');
		week_imgH.className='week_imgH';
		week_imgH.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png)`;

		var high=document.createElement('div');
		high.className='high';
		high.innerHTML=weather.forecast_list[j].high_temperature+'°';

		var low=document.createElement('div');
		low.className='low';
		low.innerHTML=weather.forecast_list[j].low_temperature+'°';

		var win=document.createElement('div');
		win.className='win';
		win.innerHTML=weather.forecast_list[j].wind_direction;

		var level=document.createElement('div');
		level.className='level';
		level.innerHTML=weather.forecast_list[j].wind_level+'级';

		week.appendChild(week_date);
		week.appendChild(week_weaH);
		week.appendChild(week_imgH);
		week.appendChild(high);
		week.appendChild(low);
		week.appendChild(win);
		week.appendChild(level);
		var scroll1=document.getElementsByClassName('scroll1')[0];

		

			scroll1.appendChild(week);

		
		
	}
	
	for(var k in citys){
		var hot_city=document.getElementsByClassName("hot_city")[0];
		// console.log(k);
		var p=document.createElement('p');
		var ul=document.createElement('ul');
		ul.className='hot_citys';
		for(var m in citys[k]){
			var li=document.createElement('li');
			li.innerHTML=m;
			ul.appendChild(li);
		}
		p.className='hot_title_city';
		 p.innerHTML=k;
		
		 hot_city.appendChild(p);
		hot_city.appendChild(ul);

	}
		var city_btn=document.getElementById("city");
		var locations=document.getElementById("location");
		var btn=document.getElementById("btn");
		var input=document.getElementsByTagName('input')[0];
		city_btn.onclick=function(){
			locations.style.display='block';
			btn.innerText="取消";
			input.value='';
		}
		
	//获取输入框焦点,按钮内容变搜索
	
		input.onfocus=function(){
		btn.innerHTML="搜索";
	}



	//操作按钮
	
			btn.onclick=function(){
				if(btn.innerText=="取消"){
					locations.style.display='none';
					
				}else{
					var str1=input.value;
					for(var n in citys){
						for(m in citys[n]){
							if(str1==m||str1==m+'市'){
								clear();
								ajax(m);
								locations.style.display='none';
								return;
							}	
							
						}
						
					}
					alert("未找到该城市");
					
				}

			}
}
				
			
		
				
				
		
	





	


