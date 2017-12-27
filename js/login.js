var code  ;
function    createCode() {
    code="" ;
    var codeLength = 4 ;
    var checkCode = document.getElementById("checkCode") ;
    var codeChars = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'
        ,'q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'
        ,'R','S','T','U','V','W','X','Y','Z') ;
    for(var i=0;i<codeLength;i++)
    {
        var charIndex = Math.floor(Math.random()*52);
        code +=codeChars[charIndex];
    }
    if(checkCode)
    {
        checkCode.className="code";
        checkCode.value = code;
    }
    return code ;
}

$(function () {
    $("#checkCode").text(createCode) ;
});

function checkNull(val , tip) {
    var Username = $(val).val() ;
    if(Username.length == 0){
        $(val).tooltip({title:tip, placement:'auto'}) ;
        $(val).tooltip('show') ;
        return false ;
    }else{
        $(val).tooltip({title:'', placement:'auto'}) ;
        return false ;
    }
}

function matchCode() {
    var buildCode = $("#checkCode").text() ;
    var inputCode = $("#captcha").val() ;

    if(code != inputCode){
        $("#captcha").tooltip({title:'验证码输入不正确', placement:'auto'}) ;
        $("#captcha").tooltip('show') ;
        return false ;
    }else{
        $("#captcha").tooltip({title:'', placement:'auto'}) ;
        return true ;
    }

}

$(function () {
    $("#formLogin").submit(function () {
        checkNull("#username" , '用户名不能为空!');
        checkNull("#password" , '密码不能为空!');
        matchCode() ;
    }) ;

    $("#formRegister").submit(function () {
        checkNull("#username" , '用户名不能为空!');
        checkNull("#password" , '密码不能为空!');
        checkNull("#repassword" , '密码不能为空!');
        checkNull("#email" , '邮箱不能为空!');
    })

    $("#formfindpassword").submit(function () {
        checkNull("#email" , '邮箱不能为空!');
    })

    $("#username").blur(function () {
        checkNull("#username" , '用户名不能为空!');
    }) ;
    $("#password").blur(function () {
        checkNull("#password" , '密码不能为空!');
    }) ;
    $("#repassword").blur(function () {
        checkNull("#repassword" , '密码不能为空!');
    }) ;
    $("#email").blur(function () {
        checkNull("#email" , '邮箱不能为空!');
    }) ;
    $("#captcha").blur(matchCode) ;
}) ;