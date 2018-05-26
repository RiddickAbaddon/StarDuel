var up1=false,down1=false,back1=false,run1=false;
var up2=false,down2=false,back2=false,run2=false;
var x1=50,y1=$(window).height()/2-50,x2=50,y2=$(window).height()/2-50;
var hp1=100,hp2=100;
var en1=100,en2=100;
var bullets1= new Array();
var bullets2= new Array();
var bulletId = 1;
var control=false;
var pause = false;
var speed = 30;
var synteticIntelligence = false;
var siWarningUp = false, siWarningDown = false, siWarningMiddle = false;
var siUpDown = 1;
var xTarget = 10;
var createBullet1inUpdate=false;
var createBullet2inUpdate=false;
window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if(control==true) {
		switch(key) {
			case 87: up1=true; break;
			case 83: down1=true; break;
			case 65: back1=true; break;
			case 68: run1=true; break;
			case 32: attack1(); break;
			
			case 80: setPause(); break;
			case 82: nowReset(); break;
		}
		if(synteticIntelligence==false) {
			switch(key) {
				case 38: up2=true; break;
				case 40: down2=true; break;
				case 39: back2=true; break;
				case 37: run2=true; break;
				case 17: attack2(); break;
			}
		}
	}
}
window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if(control==true) {
		switch(key) {
			case 87: up1=false; break;
			case 83: down1=false; break;
			case 65: back1=false; break;
			case 68: run1=false; break;
			
		}
		if(synteticIntelligence==false) {
			switch(key) {
				case 38: up2=false; break;
				case 40: down2=false; break;
				case 39: back2=false; break;
				case 37: run2=false; break;
			}
		}
	}
}
window.onload = function() {
	setTimeout(function(){
		$('#loader').fadeOut(1000);
		$('#loadcircle').fadeOut(1000);
		setTimeout(function(){
			$('#loader').remove();
			$('#loadcircle').remove();
		},1000);
	},200);
	setInterval(function(){
		if(pause==false) {
			//-----------------------------------------------------
			//UPDATE PLAYERS
			//PLAYER 1
			//UP
			 if(up1==true&&down1==false&&y1>0) {
				 if(run1==true||back1==true) y1-=speed/2;
				 else y1-=speed;
				 if($('#spaceship1').css('background-image')!='url("img/starship1_up.png")'&&
				 $('#spaceship1').css('background-image')!='url("img/starship1_back.png")'&&
				 $('#spaceship1').css('background-image')!='url("img/starship1_run.png")') {
					 $('#spaceship1').css('background-image','url("img/starship1_up.png")');
				 }
			 }
			 //DOWN
			 if(down1==true&&up1==false&&y1<($(window).height()-150)) {
				 if(run1==true||back1==true) y1+=speed/2;
				 else y1+=speed;
				 if($('#spaceship1').css('background-image')!='url("img/starship1_down.png")'||
				 $('#spaceship1').css('background-image')!='url("img/starship1_back.png")'||
				 $('#spaceship1').css('background-image')!='url("img/starship1_run.png")') {
					 $('#spaceship1').css('background-image','url("img/starship1_down.png")');
				 }
			 }
			 //BACK
			 if(back1==true&&run1==false&&x1>0) {
				 x1-=speed;
				 if($('#spaceship1').css('background-image')!='url("img/starship1_back.png")') {
					 $('#spaceship1').css('background-image','url("img/starship1_back.png")');
				 }
			 }
			 //RUN
			 if(run1==true&&back1==false&&x1<(($(window).width()/2)-150)) {
				 x1+=speed;
				 if($('#spaceship1').css('background-image')!='url("img/starship1_run.png")') {
					 $('#spaceship1').css('background-image','url("img/starship1_run.png")');
				 }
			 }
			 //IDLE
			 if(up1==false&&down1==false&&back1==false&&run1==false) {
				 $('#spaceship1').css('background-image','url("img/starship1_idle.png")');
			 }
			 //UPDATE
			 $('#spaceship1').css('top',y1+'px');
			 $('#spaceship1').css('left',x1+'px');
			 $('#hp1').css('width',hp1+'px');
			 $('#en1').css('width',en1+'px');
			 if(en1<=95)en1+=5;
			 //PLAYER 2
			 //UP
			 if(up2==true&&down2==false&&y2>0) {
				 if(run2==true||back2==true) y2-=speed/2;
				 else y2-=speed;
				 if($('#spaceship2').css('background-image')!='url("img/starship2_up.png")'||
				 $('#spaceship2').css('background-image')!='url("img/starship2_back.png")'||
				 $('#spaceship2').css('background-image')!='url("img/starship2_run.png")') {
					 $('#spaceship2').css('background-image','url("img/starship2_up.png")');
				 }
			 }
			 //DOWN
			 if(down2==true&&up2==false&&y2<($(window).height()-150)) {
				 if(run2==true||back2==true) y2+=speed/2;
				 else y2+=speed;
				 if($('#spaceship2').css('background-image')!='url("img/starship2_down.png")'||
				 $('#spaceship2').css('background-image')!='url("img/starship2_back.png")'||
				 $('#spaceship2').css('background-image')!='url("img/starship2_run.png")') {
					 $('#spaceship2').css('background-image','url("img/starship2_down.png")');
				 }
			 }
			 //BACK
			 if(back2==true&&run2==false&&x2>0) {
				 x2-=speed;
				 if($('#spaceship2').css('background-image')!='url("img/starship2_back.png")') {
					 $('#spaceship2').css('background-image','url("img/starship2_back.png")');
				 }
			 }
			 //RUN
			 if(run2==true&&back2==false&&x2<(($(window).width()/2)-150)) {
				 x2+=speed;
				 if($('#spaceship2').css('background-image')!='url("img/starship2_run.png")') {
					 $('#spaceship2').css('background-image','url("img/starship2_run.png")');
				 }
			 }
			 //IDLE
			 if(up2==false&&down2==false&&back2==false&&run2==false) {
				 $('#spaceship2').css('background-image','url("img/starship2_idle.png")');
			 }
			 //UPDATE
			 $('#spaceship2').css('top',y2+'px');
			 $('#spaceship2').css('right',x2+'px');
			 $('#hp2').css('width',hp2+'px');
			 $('#en2').css('width',en2+'px');
			 if(en2<=95)en2+=5;
			 //------------------------------------------------
			 //UPDATE SI
			 if(synteticIntelligence==true&&control==true) updateSI();
			 //UPDATE OBJECTS
			 if(createBullet1inUpdate==true) createBullet1();
			 if(createBullet2inUpdate==true) createBullet2();
			 updateBullets();
		}
	},100);
}
function attack1() {
	if(en1>=25) {
		createBullet1inUpdate=true;
		en1-=25;
	}
}
function attack2() {
	if(en2>=25) {
		createBullet2inUpdate=true;
		en2-=25;
	}
}
function createBullet1() {
	createBullet1inUpdate=false;
	$('body').append('<div class="bullet" id="bulletId'+bulletId+'" style="top:'+(y1+40)+'px; right:'+($(window).width()-x1-100)+'px; background-image: url('+"'img/bullet1.png"+"'"+')"></div>');
	bullets1.push({
		id : "#bulletId"+bulletId,
		x  : ($(window).width()-x1-100),
		y  : (y1+40)
	});
	bulletId++;
}
function createBullet2() {
	createBullet2inUpdate=false;
	$('body').append('<div class="bullet" id="bulletId'+bulletId+'" style="top:'+(y2+40)+'px; left:'+($(window).width()-x2-100)+'px; background-image: url('+"'img/bullet2.png"+"'"+')"></div>');
	bullets2.push({
		id : "#bulletId"+bulletId,
		x  : ($(window).width()-x2-100),
		y  : (y2+40)
	});
	bulletId++;
}
function collider(x,y,state) {
	switch(state) {
	case 1:
		if(
		x<=x2+400&&
		x+50>=x2+100&&
		y+20>=y2-130&&
		y<=y2-30
		) return true;
		else return false;
		break;
	case 2:
		if(
		x<=x2+300&&
		x+50>=x2+100&&
		y+20>=y2-50&&
		y<=y2+150
		) return true;
		else return false;
		break;
	case 3:
		if(
		x<=x2+400&&
		x+50>=x2+100&&
		y+20>=y2+130&&
		y<=y2+230
		) return true;
		else return false;
		break;
	}
}
function updateBullets() {
	//PLAYER 1 BULLETS
	for(var i=0;i<bullets1.length;i++) {
		el=bullets1[i];
		if(el.x<=0) {
			bullets1.splice(i,1);
			$(el.id).remove();
			i--;
		} else {
			el.x-=speed*1.5;
			$(el.id).css('right',el.x+'px');
			//COLLISION
			if(
			el.x<=x2+90&&
			el.x+50>=x2-10&&
			el.y+20>=y2-10&&
			el.y<=y2+90
			) {
				bullets1.splice(i,1);
				$(el.id).remove();
				i--;
				hp2-=10;
				if(hp2<=0) end(1);
			}
		}
	}
	//PLAYER 2 BULLETS
	for(var i=0;i<bullets2.length;i++){
		el=bullets2[i];
		if(el.x<=0) {
			bullets2.splice(i,1);
			$(el.id).remove();
			i--;
		} else {
			el.x-=speed*1.5;
			$(el.id).css('left',el.x+'px');
			//COLLISION
			if(
			el.x<=x1+90&&
			el.x+50>=x1-10&&
			el.y+20>=y1-10&&
			el.y<=y1+90
			) {
				bullets2.splice(i,1);
				$(el.id).remove();
				i--;
				hp1-=10;
				if(hp1<=0) end(2);
			}
		}
	}
}
function start() {
	if(synteticIntelligence==true) $('#Sname2').css('color','#6cc');
	else $('#Sname2').css('color','white');
	$('#start').css('animation','out 1s 1');
	setTimeout(function(){
		$('#start').hide();
		control=true;
	},990);
	$('#Sname1').html($('#name1').val());
	$('#Sname2').html($('#name2').val());
}
function SI() {
	synteticIntelligence = true;
	$('#name2').val('Xeno SI');
	$('#Sname2').html('Xeno SI');
	start();
}
function rand(a,b) {
	return a+Math.round(Math.random()*(b-a));
}
function updateSI() {
	xTarget = ($(window).width()/2)-x1;
	if(en2>rand(25,100)) attack2();
	siWarningUp=false;
	siWarningMiddle=false;
	siWarningDown=false;
	bullets1.forEach(function(el){
		if(collider(el.x,el.y,1)) siWarningUp=true;
		if(collider(el.x,el.y,2)) siWarningMiddle=true;
		if(collider(el.x,el.y,3)) siWarningDown=true;
			
	});
	if(siWarningMiddle==true) {
		if((siWarningUp==true&&y2+50<$(window).height()-200)||(siWarningDown==true&&y2+50>$(window).height()-200)) {down2=true;up2=false;}
		if((siWarningDown==true&&y2+50>200)||(siWarningUp==true&&y2+50>200)) {up2=true;down2=false;}
		if((siWarningUp==true&&siWarningDown==true)||(siWarningUp==false&&siWarningDown==false)) {
			if(y2+50<200) siUpDown = 1;
			if(y2+50>$(window).height()-200) siUpDown = 2; 
			if(siUpDown==1) {down2=true;up2=false;}
			else {up2=true;Down2=false;}
		}
	} else {
		if((y1+50>y2+80&&siWarningDown==false)||siWarningUp==true) down2=true;
		else down2=false;
		if((y1+50<y2+20&&siWarningUp==false)||siWarningDown==true) up2=true;
		else up2=false;
		if(x2+100<xTarget-200&&siWarningUp==false&&siWarningDown==false) run2=true;
		else run2=false;
		if(x2+100>xTarget+200) back2=true;
		else back2=false;
	}
}
function end(player) {
	var winner="Wygrywa ";
	if(player==1){
		if($('#name1').val()=="") winner=winner+'lewy gracz'; 
		else  winner=winner+$('#name1').val();
	} else {
		if($('#name2').val()=="") winner=winner+'prawy gracz'; 
		else  winner=winner+$('#name2').val();
	}
	$('#winner').html(winner);
	$('#end').css('display','block');
	$('#end').css('animation','in 1s 1');
	var removeElements=new Array($('.bullet').toArray());
	removeElements.forEach(function(el){
		$(el).remove();
	});
	control=false;
	if(pause==true) setPause();
	pause=true;
}
function reset() {
	if(synteticIntelligence==true) {
		$('#name2').val('');
		$('#Sname2').html('');
		synteticIntelligence = false;
	}
	pause=false;
	up1=false,down1=false,back1=false,run1=false;
	up2=false,down2=false,back2=false,run2=false;
	x1=50,y1=$(window).height()/2-50,x2=50,y2=$(window).height()/2-50;
	hp1=100,hp2=100;
	en1=100,en2=100;
	bullets1= new Array();
	bullets2= new Array();
	bulletId = 1;
	$('#end').css('animation','out 1s 1');
	setTimeout(function(){
		$('#end').css('display','none');
	},990);
	$('#start').show();
	$('#start').css('animation','in 1s 1');
}
function setPause() {
	if(pause==false) {
		pause=true;
		$('#pause').css('display','block');
		$('#pause').css('animation','in 1s 1');
	} else {
		$('#pause').css('animation','out 1s 1');
		setTimeout(function(){
			$('#pause').css('display','none');
			pause=false;
		},990);
	}
}
function nowReset() {
	if(pause==true) setPause();
	var removeElements=new Array($('.bullet').toArray());
	removeElements.forEach(function(el){
		$(el).remove();
	});
	control=false;
	reset();
}