$(function(){
    var windheight = $(window).height();
    $(".index-main").css({"height":(windheight-45)});
    menu_ul();
    click_gongneng();
});
function menu_ul(){
       var theight   = ($(window).height())-45;
       var zong_li_h = 0;
       var k=1;
       var li="";
       var urlstr_array =new Array();
       $(".index-menu li").each(function(index){
            zong_li_h += $(this).height();
            theight     = parseInt(theight/$(this).height())*100;
            if((zong_li_h)>(theight*k)){
                    if(zong_li_h  >(theight*(k+1))){
                        k++; 
                    }
                    li = "<li>"+$(this).html()+"</li>";
                    if($.trim(urlstr_array[k-1])){
                        urlstr_array[k-1] += li;
                    }else{
                        urlstr_array[k-1]   = li;
                    }
                    $(this).remove();
            }
       });
       var count = urlstr_array.length;
       var ulstr="";
       for(i=0;i<count; i++){
          ulstr += "<ul class='index-menu'>"+urlstr_array[i]+"</ul>";
       }
       $(".index-main").find("div.cl").remove();
       $(".index-main").append(ulstr);
       $(".index-main").append('<div class="cl"></div>');
}
//点击功能按钮
function click_gongneng(OB){
    if(!$.trim(OB)){
            $(".menu-gongneng ul li").mouseover(function () {
                    $(this).find(".sub_nav").eq(0).removeClass("hide");
                    var len = $(this).find(".sub_nav:eq(0)>li").length;
                    var len2 = $(this).nextAll().length;
                    if((len*36-1) > len2*36){
                        $(this).find(".sub_nav").eq(0).css({"top":"-"+((len)*36-1)+"px"})
                    }else{
                        $(this).find(".sub_nav").eq(0).css({"top":"-35px"})
                    }
            });
            
            $(".menu-gongneng ul li").mouseleave(function () {
                $(this).find(".sub_nav").removeClass("hide");
                $(this).find(".sub_nav").addClass("hide");
            });
            $("body").not(".menu-gongneng").not(".footer-butt-r").click(function(){
                alert();
                $(".menu-gongneng").removeClass("hide");
                $(".menu-gongneng").addClass("hide");
            });
            
    }else{
            $(".menu-gongneng").removeClass("hide");
    }
}


function JC(){
    var h1 = $(".Trb_right").height();
    var h2 = $(window).height();
    var h3 = $(".msgbox-content").height();
    var w1 = $(window).width();
    var w2 = $(".msgbox-content").width();
    if( h1 > h2){
        $(".msgbox-bg").height((h1+200));
    }else{
        $(".msgbox-bg").height((h2+200));
    }
    $(".msgbox-content").css({"top":(h2-h3)/2,"left":(w1-w2)/2});
}
function NO01(){
    $(".msgbox-content").remove();
    $(".msgbox-bg").remove();
}
sub_go = 0;
function MSGBOX(method,url,obj,alertmsg){
    if(sub_go != 0 || ($.trim(alertmsg) && !confirm(alertmsg))){
         return ;
    }
    msg    =   '<div class="msgbox-bg"></div><div class="msgbox-content">';
    if(method == "post"){
             $.ajax({
                        url: url,
                        type: 'post',
                        data:obj.serialize(),
                        dataType: 'json',
                        beforeSend: function(){	//开始上传 
                            //$(".error").html('正在处理中，请稍后......');
                            sub_go = 1;
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert("错误信息: 系统超时，请求错误！");
                        },
                        uploadProgress: function(event, position, total, percentComplete) {
                            var percentVal = percentComplete + '%';	//获得进度
                            //$(".error").html(percentVal);	//显示上传进度百分比
                        },
                        success: function(data) {
                                if(data.content){
                                    msg    +=   ' <div class="content01">'+data.content+'</div>';  
                                }
                                if(data.btt){
                                    msg    +=   ' <div class="butt01">'+data.btt+'<div class="cl"></div></div>'; 
                                }else{
                                    msg    +=   ' <div class="butt01"><span class="btt-msg1" onclick="NO01();">确定</span><span class="btt-msg1" onclick="NO01();">取消</span><div class="cl"></div></div>'; 
                                }
                                msg    +=   '</div>';
                            $("body").append(msg);
                            JC();
                        },
                        complete: function() {
                            sub_go = 0;
                        }
          });   
    }else{
            $.ajax({
                       url: url,
                       type: 'get',
                       dataType: 'json',
                       beforeSend: function(){	//开始上传 
                           sub_go = 1;
                       },
                       error: function(XMLHttpRequest, textStatus, errorThrown) {
                          alert("错误信息: 系统超时，请求错误！");
                       },
                       uploadProgress: function(event, position, total, percentComplete) {
                           var percentVal = percentComplete + '%';	//获得进度
                       },
                       success: function(data) {
                                if(data.content){
                                    msg    +=   ' <div class="content01">'+data.content+'</div>';  
                                }
                                if(data.btt){
                                    msg    +=   ' <div class="butt01">'+data.btt+'<div class="cl"></div></div>'; 
                                }else{
                                    msg    +=   ' <div class="butt01"><span class="btt-msg1" onclick="NO01();">确定</span><span class="btt-msg1" onclick="NO01();">取消</span><div class="cl"></div></div>'; 
                                }
                                msg    +=   '</div>';
                            $("body").append(msg);
                            JC();
                       },
                       complete: function() {
                           sub_go = 0;
                       }
            });
    }
  
}


