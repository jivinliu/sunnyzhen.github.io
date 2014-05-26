// JavaScript Document
var PathList;//װ����Ƭ·�������б�
var chop_image;

window.onload=function(){
	ResetChopBlock();
}

function ResetChopBlock(){
	ResetPathList();
	GetImage();
}

function GetImage(){
		
	var chop_block=document.getElementById("chop_block");
	var chop_ctx=chop_block.getContext("2d");
	var chop_image=new Image();
	var _chop_image = (location.search)?location.search.replace('?',''):"data/bg.jpg";
	chop_image.src=_chop_image;
	//itune_image.src="images/img_1.jpg";
	chop_image.height=300;
	chop_image.width=300;
	chop_image.onload=function(){
		//chop_ctx.drawImage(chop_image,0,0,300,300);
		
		setBg(_chop_image);
		
		var StartPoint={X:0,Y:0};//��갴����ʼ��
		var EndPoint={X:0,Y:0};//����϶��������
		
		chop_block.onmousedown=MouseDown;
		chop_block.onmouseup=MouseUp;
		
		
		function MouseDown(event){
			var event=event||window.event;
			
			StartPoint.X=event.layerX;
			StartPoint.Y=event.layerY;
			
		}
		
		function MouseUp(event){
			var event=event||window.event;
			if(StartPoint.X!=event.layerX&&StartPoint.Y!=event.layerY){
				EndPoint.X=event.layerX;
				EndPoint.Y=event.layerY;
			}
			
			var line=new Array();
			line.push(StartPoint);
			line.push(EndPoint);
			
			//�����λ
			StartPoint={X:0,Y:0};
			EndPoint={X:0,Y:0};
			
			var currentPath=PathList[PathList.length-1];
			
			//console.log(line);
			
			var temArea=GetArea(currentPath,line);
			
			//var temArea=GetRectArea(line);
			
			//console.log(temArea);
			
				console.log("ZHEN POINT DATA:");
				for(var i in temArea[0]){
					console.log("area_1 "+ i +" "+temArea[0][i].X+" "+temArea[0][i].Y);
				}
				
				for(var i in temArea[1]){
					console.log("area_2 "+ i +" "+temArea[1][i].X+" "+temArea[1][i].Y);
				}
				
				console.log("ZHEN POINT DATA!");
			
			PathList.pop();//ɾ�����и�·��
			PathList.push(temArea[0]);
			PathList.push(temArea[1]);
			
			chop_ctx.fillStyle='rgba(255,255,255,1)';
			chop_ctx.fillRect(0,0,300,300);
			
			Paint(temArea[1]);//���Ƴ�PathList���һ��ͼ��
			
			//GetPath(PathList);
			
			//console.log(StartPoint.X+" "+StartPoint.Y+" "+EndPoint.X+" "+EndPoint.Y);
		}
		
/*		var path=new Array();
		path.push({X:0,Y:0});
		path.push({X:100,Y:0});
		path.push({X:100,Y:100});
		path.push({X:50,Y:100});
		
		PathList.push(path);
		
		var path=new Array();
		path.push({X:150,Y:10});
		path.push({X:180,Y:0});
		path.push({X:180,Y:200});
		path.push({X:50,Y:100});
		
		PathList.push(path);
		
		//console.log(PathList);
		
		GetPath(PathList);*/
		
		function GetPath(PathList){
			for(var i=0;i<PathList.length;i++){
				Paint(PathList[i]);
			}
		}
		
		function Paint(path){//��·����Ƭ���Ƶ�canvas��
			chop_ctx.beginPath();
			chop_ctx.moveTo(path[0].X,path[0].Y);
			for(var i=1;i<path.length;i++){
				chop_ctx.lineTo(path[i].X,path[i].Y);
			}
			chop_ctx.closePath();
			
			chop_ctx.fillStyle = chop_ctx.createPattern(chop_image, "no-repeat");
			chop_ctx.fill();
			chop_ctx.stroke();
		}
		
	}
	
}

function setBg(chop_image){
	var chop_box=document.getElementById("chop_box");
	chop_box.style.backgroundImage="url("+chop_image+")";
}

function ResetPathList(){
	PathList=new Array();
	var path=new Array();
	path.push({X:0,Y:0});
	path.push({X:300,Y:0});
	path.push({X:300,Y:300});
	path.push({X:0,Y:300});
	PathList.push(path);
	
}

/*var line_1 = new Array();
var line_2 = new Array();
var line_3 = new Array();
line_1.push({X:0,Y:0});
line_1.push({X:0,Y:300});
line_2.push({X:20,Y:170});
line_2.push({X:270,Y:160});
line_3.push({X:300,Y:0});
line_3.push({X:300,Y:300});

console.log("line1+line2");
console.log(CrossPoint(line_1,line_2));
console.log("line2+line3");
console.log(CrossPoint(line_3,line_2));*/

function CrossPoint(line_1,line_2){
/*	
	console.log(line_1);
	console.log(line_2);*/
	
	var CrossPoint={X:-1,Y:-1};
	
	if(line_1[0].Y==line_1[1].Y){//�������ˮƽ�ߣ��ǽ���ض�Y��������Y������ȣ�ֱ�Ӹ�ֵ����
		CrossPoint.Y=line_1[0].Y;
	}
	else if(line_2[0].Y==line_2[1].Y){
		CrossPoint.Y=line_2[0].Y;
	}
	else{//�����ĵ����߹�ʽ��������
		CrossPoint.Y= Math.round(((line_1[0].Y-line_1[1].Y)*(line_2[1].Y-line_2[0].Y)*line_1[0].X + (line_2[1].Y-line_2[0].Y)*(line_1[1].X-line_1[0].X)*line_1[0].Y + (line_1[1].Y-line_1[0].Y)*(line_2[1].Y-line_2[0].Y)*line_2[0].X + (line_2[0].X-line_2[1].X)*(line_1[1].Y-line_1[0].Y)*line_2[0].Y ) / ( (line_1[1].X-line_1[0].X)*(line_2[1].Y-line_2[0].Y) + (line_1[0].Y-line_1[1].Y)*(line_2[1].X-line_2[0].X) ));
	}
	
	if(line_1[0].X==line_1[1].X){//������ڴ�ֱ�ߣ��ǽ���ض�X��������X������ȣ�ֱ�Ӹ�ֵ����
		CrossPoint.X=line_1[0].X;
	}
	else if(line_2[0].X==line_2[1].X){
		CrossPoint.X=line_2[0].X;
	}
	else{
		CrossPoint.X=Math.round(line_2[0].X + (line_2[1].X-line_2[0].X)*(CrossPoint.Y-line_2[0].Y) / (line_2[1].Y-line_2[0].Y));
	}

	if(isNaN(CrossPoint.X)||isNaN(CrossPoint.Y)){
		CrossPoint={X:-1,Y:-1};
	}	
	
	return CrossPoint;//�н��㷵�ؽ��� û���㷵��{X:-1,Y:-1};
}

function GetRectArea(s_line){//��������s_line�Ὣcanvas������������area_1,area_2����
	var canvas_spots=new Array();
	var area_1=new Array(); 
	var area_2=new Array();
	var crosspoint=null;
	
	canvas_spots.push({X:0,Y:0});
	canvas_spots.push({X:300,Y:0});
	canvas_spots.push({X:300,Y:300});
	canvas_spots.push({X:0,Y:300});
	
	for(var i=0;i<canvas_spots.length;i++){
		var line=new Array();
		line.push(canvas_spots[i]);
		line.push(canvas_spots[i+1]);
		
		if(i==canvas_spots.length-1){
			var line=new Array();
			line.push(canvas_spots[i]);
			line.push(canvas_spots[0]);
		}
		
		crosspoint=CrossPoint(line,s_line);
		
		//console.log(crosspoint);
		
		if(crosspoint.X>=0&&crosspoint.X<=300&&crosspoint.Y>=0&&crosspoint.Y<=300){//�����Ƿ���������
			if(area_1.length==0){//���areaΪ�գ���ֱ��һ��area_1,һ��area_2
				area_1.push(canvas_spots[i]);
				area_2.push(canvas_spots[i+1]);
			}
			else{//area��Ϊ�գ������ȡ����һ���㣬�뵱ǰ�����ߣ������и����ж��ཻ����ཻ��ǰ����area_2�ģ��������area_1��
				var line=new Array();
				line.push(canvas_spots[i]);
				line.push(area_1[0]);
				crosspoint=CrossPoint(line,s_line);
				
				var flag=0;
				if(crosspoint.X>=0&&crosspoint.X<=300&&crosspoint.Y>=0&&crosspoint.Y<=300){//�ཻ�����area_2�ظ�
					for(var j=0;j<area_2.length;j++){
						if(area_2[j].X==canvas_spots[i].X&&area_2[j].Y==canvas_spots[i].Y){
							flag=1;//�ظ��˾ͱ�ʶ�������
						}
					}
					if(flag==0){//���ظ�����ӵ�area_2��
						area_2.push(canvas_spots[i]);
					}
				}
				else{//���������ཻ����ǰ����area_1ͬ������
					for(var j=0;j<area_1.length;j++){
						if(area_1[j].X==canvas_spots[i].X&&area_1[j].Y==canvas_spots[i].Y){
							flag=1;//�ظ��˾ͱ�ʶ�������
						}
					}
					if(flag==0){//���ظ�����ӵ�area_1��
						area_1.push(canvas_spots[i]);
					}
				}
			}
		}
		else{// ���㲻��������
			if(area_1.length==0){//���areaΪ�գ���ֱ����������area_1
				area_1.push(canvas_spots[i]);
				area_1.push(canvas_spots[i+1]);
			}
			else{//area��Ϊ�գ����һ���뵱ǰ���ߵ����ߣ��ж��������Ƿ��ཻ��������ǰ���������һ����������������ǰ������ͬһ������
				var line=new Array();
				line.push(canvas_spots[i]);
				line.push(area_1[0]);
				crosspoint=CrossPoint(line,s_line);
				
				var flag=0;
				if(crosspoint.X>=0&&crosspoint.X<=300&&crosspoint.Y>=0&&crosspoint.Y<=300){//�ཻ�����area_2�ظ�
					for(var j=0;j<area_2.length;j++){
						if(area_2[j].X==canvas_spots[i].X&&area_2[j].Y==canvas_spots[i].Y){
							flag=1;//�ظ��˾ͱ�ʶ�������
						}
					}
					if(flag==0){//���ظ�����ӵ�area_2��
						area_2.push(canvas_spots[i]);
					}
				}
				else{//���������ཻ����ǰ����area_1ͬ������
					for(var j=0;j<area_1.length;j++){
						if(area_1[j].X==canvas_spots[i].X&&area_1[j].Y==canvas_spots[i].Y){
							flag=1;//�ظ��˾ͱ�ʶ�������
						}
					}
					if(flag==0){//���ظ�����ӵ�area_1��
						area_1.push(canvas_spots[i]);
					}
				}
				
			}
			
		}
	}
	
/*	console.log("ZHEN POINT DATA0000:");
	for(var i in area_1){
		console.log("area_1 "+ i +" "+area_1[i].X+" "+area_1[i].Y);
	}
	
	for(var i in area_2){
		console.log("area_2 "+ i +" "+area_2[i].X+" "+area_2[i].Y);
	}
	
	console.log("ZHEN POINT DATA!0000");*/
	
	
	var area=SeparateArea(canvas_spots,area_1,area_2,s_line);
/*	console.log("ZHEN POINT DATA:");
	for(var i in area[0]){
		console.log("area_1 "+ i +" "+area[0][i].X+" "+area[0][i].Y);
	}
	
	for(var i in area[1]){
		console.log("area_2 "+ i +" "+area[1][i].X+" "+area[1][i].Y);
	}
	
	console.log("ZHEN POINT DATA!");*/
	
	return area;
}


function GetConnectLine(area_ori,area_1,area_2){//area_1Ϊ���������߶���ɵ�����area_2Ϊһ���������߶�Χ�ǵ�����
	var line_1=new Array();
	var line_2=new Array();
	var line=new Array();
	
/*	console.log("ZHEN area_1 DATA:");
	for(var j in area_1){
		console.log("area_1 "+ j +" "+area_1[j].X+" "+area_1[j].Y);
	}
	console.log("ZHEN area_2 DATA:");
	for(var j in area_2){
		console.log("area_1 "+ j +" "+area_2[j].X+" "+area_2[j].Y);
	}*/
	
	for(var i=0;i<area_ori.length;i++){
		if(area_ori[i].X==area_2[0].X&&area_ori[i].Y==area_2[0].Y){
			line_1.push(area_ori[i-1]);
			line_1.push(area_ori[i]);
			
			if(i+area_2.length>=area_ori.length){
				line_2.push(area_ori[i+area_2.length-area_ori.length]);
			}
			else{
				line_2.push(area_ori[i+area_2.length]);
			}
			
			line_2.push(area_2[area_2.length-1]);
			
			
			line.push(line_1);
			line.push(line_2);
			
			return line;
		}
	}
	
}


function SeparateArea(area_ori,area_1,area_2,s_line){//�������Ѿ�����ĵ㼯��ָ������ӣ����������ָ�����
	var area=new Array();
	var line=GetConnectLine(area_ori,area_1,area_2);
	var index=0;
	
	var crosspoint=CrossPoint(line[0],s_line);
	
	for(var i=0;i<area_1.length;i++){
		if(line[0][0].X==area_1[i].X&&line[0][0].Y==area_1[i].Y){
			index=i+1;
			//console.log(area_1[i]);
			area_1.splice(index,0,crosspoint);
			break;
		}
	}
	
	area_2.unshift(crosspoint);
	
	crosspoint=CrossPoint(line[1],s_line);
	
	area_2.push(crosspoint);
	area_1.splice(index+1,0,crosspoint);
	area.push(area_1);
	area.push(area_2);
	
	return area;
	
}

function GetSubArea(area,s_line){
	var SeparateArea=GetRectArea(s_line);//�õ����ڷָ�����canvas�õ��������ָ�����
	var temArea_1=new Array();
	var temArea_2=new Array();
	
	for(var i=0;i<area.length;i++){
		if(PointInArea(SeparateArea[0],area[i])){//����һ��������
			//console.log("in area_1");
			temArea_1.push(area[i]);
		}
		else{//���ڶ���������
			temArea_2.push(area[i]);
			//console.log("in area_2");
		}
	}
	
	var separateArea=SeparateArea(area,temArea_1,temArea_2,s_line);//���ػ�� ����������Ĳü�����
	PathList.pop();
	PathList.push(separateArea[0]);
	PathList.push(separateArea[1]);
	
}

function PointInArea(area,point){
	for(var i=0;i<area.length;i++){
		var line=new Array();
		line.push(area[i]);
		line.push(point);
		
		for(var j=0;j<area.length;j++){
			var line_2=new Array();
			line_2.push(area[i]);
			line_2.push(area[i+1]);
			if(j==length-1){
				var line_2=new Array();
				line_2.push(area[j]);
				line_2.push(area[0]);
			}
			crosspoint=CrossPoint(line,line_2);
			if(crosspoint.X>=0&&crosspoint.Y>=0){
				return false;
			}
			else{
				continue;
			}
		}
	}
	return true;
}

//��֪�ĵ� ����ֱ�߽���
//y = ( (y0-y1)*(y3-y2)*x0 + (y3-y2)*(x1-x0)*y0 + (y1-y0)*(y3-y2)*x2 + (x2-x3)*(y1-y0)*y2 ) / ( (x1-x0)*(y3-y2) + (y0-y1)*(x3-x2) );
//x = x2 + (x3-x2)*(y-y2) / (y3-y2);

//���ڶ������
//����ÿ������ζ�������߸��������������ı��޽��㣬�����ж�������������б�����ֱ�ߵķ��̣�n*n�ĸ��Ӷ�

function GetArea(Path,s_line){//�����и�·�����и��ߣ������и������·��
	//var temArea=GetRectArea(line);
	//return temArea;
	var checkArea=GetRectArea(s_line);//�������л������õ���������
	var area_1=new Array();
	var area_2=new Array();
	var flag=0;
	var k=0;
	if(s_line[0].Y!=s_line[1].Y){
		k=Math.round((s_line[0].X-s_line[1].X)/(s_line[0].Y-s_line[1].Y));
	}
	else{
		k=0;//ˮƽ��
	}
	//ֱ��б�ʷ���x+k*y1-x1-k*y=0;
	var param=Path[0].X+k*s_line[0].Y-s_line[0].X-k*Path[0].Y;
	area_1.push(Path[0]);
	
	for(var i=1;i<Path.length;i++){
		if(param>=0){
			if(Path[i].X+k*s_line[0].Y-s_line[0].X-k*Path[i].Y>=0){
				area_1.push(Path[i]);
			}
			else{
				area_2.push(Path[i]);
			}
		}
		else{
			if(Path[i].X+k*s_line[0].Y-s_line[0].X-k*Path[i].Y<0){
				area_1.push(Path[i]);
			}
			else{
				area_2.push(Path[i]);
			}
		}
	}
	
	
/*	for(var i=0;i<Path.length;i++){
		var line=new Array();
		line.push(Path[i]);
		for(var j=0;j<checkArea[0].length;j++){//ȡ����һ��·��Ϊ�ж�·����·���Ķ˵�ͼ�������� �� ���·���ı�һһ����ཻ

			if(Path[i].X==checkArea[0][j].X&&Path[i].Y==checkArea[0][j].Y){
				area_1.push(Path[i]);
				break;
			}
			
			line.push(checkArea[0][j]);
			var crosspoint=CrossPoint(line,s_line);//���Ǹ��и��ߣ����Ǹ��߰����Ҳ�
			//console.log(crosspoint);
			if(crosspoint.X>0&&crosspoint.X<300&&crosspoint.Y>0&&crosspoint.Y<300){//���ڽ���
				area_1.push(Path[i]);
				flag=1;
				break;
			}
			else{
				line.pop();
			}
		}
		if(flag==0){
			area_2.push(Path[i]);
		}
		else{
			flag=0;
		}
	}
	
	//ѭ��һȦ�󣬿��Եõ��������и��ߵ�����area����*/
	
	//console.log(area_1);
	//console.log(area_2);
	
	var area=SeparateArea(Path,area_1,area_2,s_line);
	
	//console.log(area);
	
	return area;
}


//����ж�������ֱ��ͬ�໹�����?
//�ֱ���������ֱ�߷��̣��ó����Ϊͬ�ž�ͬ�࣬���Ϊ���






