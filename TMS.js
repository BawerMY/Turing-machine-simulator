var str
var pos = '0'
var code
var consoleU = document.getElementById("console")
for(var i = -10; i <= 10; i++){
    if(i != 10) document.getElementById("str").innerHTML += '<span class="cell" id="'+i+'">-</span>'
    else document.getElementById('str').innerHTML += '<span class="cell" id="'+i+'">-</span>'
}
function stop(){
    console.log("stop")
}
function get(){return str[str.indexOf("$")+1]}
function set(c){str[str.indexOf("$")+1] = c}
function go(direction){
    var i = str.indexOf("$")
    if(direction=='r'){//maybe whit the dhanging character
        str[str.indexOf("$")]=str[str.indexOf("$")+1]
        str[i+1]="$"
        i = str.indexOf("$")
        if(i==str.length-1){str.push('-')}

        
    }
    else if(direction=='l'){
        if(i==0) str.unshift('-')
        i = str.indexOf("$")
        str[str.indexOf("$")]=str[str.indexOf("$")-1]
        str[i-1]="$"
    }
}
function push(){
    for(var i = 0;i <= 10; i++) document.getElementById(i).innerHTML = (str[str.indexOf("$")+1+i] != undefined)?str[str.indexOf("$")+1+i]:'-'
    for(var i = -1;i >= -10; i--) document.getElementById(i).innerHTML = (str[str.indexOf("$")+i] != undefined)?str[str.indexOf("$")+i]:'-'
    
}
function run(){
    for(var i =-10; i <= 10; i++) document.getElementById(i).innerHTML = '-'
    str = ((document.getElementById("input").value.length != 0)?"$" + document.getElementById("input").value:"$-").split('')

    codeStr = document.getElementById("code1").value + document.getElementById("code2").value + document.getElementById("code3").value + document.getElementById("code4").value + document.getElementById("code5").value
    codeStr = codeStr.replace(/(\n)/g,"");//WTF
    code = codeStr.toString().split(/[()]+/);
    code = code.filter(elm => elm);
    for(var i = 0; i < code.length; i++){
        code[i] = code[i].split(',')
    }
    
    console.log(code)
    noDugFound = debugOnStart(code)
    
    console.log(code)
    while(noDugFound){
        var found = false
        for(var i = 0; i < code.length; i++){
            for(var j = 0; j < code[i][1].length; j++){
                if(pos==code[i][0] && get() == code[i][1][j]){
                    pos = code[i][2]
                    document.getElementById('pos').innerHTML = pos
                    set(code[i][3][j])
                    if(code[i][4] == '<') go('l')
                    else if(code[i][4] == '>') go('r')
                    found = true
                    break
                }
            }
            continue
        }
        if(found == true) continue
        else break
    }

    push()
}
function debugOnStart(code){
    for(var i = 0; i < code.length; i++){
        //warning state will called never
        
        code[i][1] = [code[i][1]]
        code[i][3] = [code[i][3]]
        if(code[i][1][0].includes('..')){
            if(isNaN(code[i][1][0].indexOf('..')-1))  {consoleU.innerHTML += "syntax error in line "+ (i + 1) + "input 1"; return false}
            var nrs = []
            for(var i = code[i][1][0].indexOf('..')-1; i <= code[i][1][0].indexOf('..')+3; i++){
                nrs.push[i]
            }
            code[i][1][0] = nrs
        }
        if(code[i][3][0].includes('..')){
            {consoleU.innerHTML += "syntax error in line "+ (i + 1) + "input 3"; return false}
            var nrs = []
            for(var i = code[i][3][0].indexOf('..')-1; i <= code[i][3][0].indexOf('..')+3; i++){
                nrs.push[3]
            }
            code[i][3] = nrs
        }
        if(code[i][1][0].length > 1){
            var charList = []
            for(var i = 0; 1 <= code[i][1][0].length-1; i++){
                charList.push(code[i][1][i])
            }
            code[i][1][0] = charList
        }
        if(code[i][3][0].length > 1){
            var charList = []
            for(var i = 0; 1 <= code[i][3][0].length-1; i++){
                charList.push(code[i][3][i])
            }
            code[i][3][0] = charList
        }
        if(code[i][1][0].length == 0 || (code[i][1][0].length != code[i][1][0].length && code[i][1][0].length != 1)) {consoleU.innerHTML += "syntax error in line "+ (i + 1) + "input 1"; return false}
}
}
/*
(0,AB,0,BA,>)
(0,-,FINE,-,-)
*/
// divi aggiungere 1..9 e abc(forse anche a pos) e il programma deve sare errore o all'ninzio o nel percorso e devi fare timing, funsiona solo 1 volta fixalo