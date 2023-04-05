const allCheckBox = document.querySelectorAll('input[type="checkbox"]'),
      allColor = document.querySelectorAll('.useful span'),
      letter = document.querySelector('.flex span:last-of-type'),
      range = document.querySelector('input[type="range"]'),
      generateBtn = document.getElementById('generatePassword'),
      showPassword = document.querySelector('header .show-password'),
      password = document.getElementById('password'),
      passwordQuality = document.querySelector('.value > span');

      const alphabetUpperCase = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(",");
      const alpabetLowerCase = alphabetUpperCase.map(text=> text.toLowerCase());
      const numbers = '1,2,3,4,5,6,7,8,9,0'.split(',');
      const symbols  = `"#$%&'()*+,-./[]^{|}~Δ¢£¤¥§¨©`.split('');

allCheckBox.forEach(element=> {
    element.addEventListener('click',changeColor);
});

range.addEventListener('input',changeLetter);
generateBtn.addEventListener('click',generate);

password.addEventListener('click',()=> {
    if(showPassword.innerText.length){
        navigator.clipboard.writeText(showPassword.innerText);
        showPassword.innerText = "";
    }else{

    }
});

//functions 
function changeColor(e){
    const checkedElementNumber = [...allCheckBox].filter(element=> element.checked).length;
    const allColorSpan = [...allColor];

    let color = "",
        text = "";

    switch(checkedElementNumber){
        case 1:
            color = 'F64A4A';
            text = "TOO WEAK!"
            break;
        case 2:
            color = 'FB7C58';
            text = "WEAK"
            break;
        case 3:
            color = 'F8CD65';
            text = "MEDIUM";
            break;
        case 4:
            text = "STRONG";
            color = 'A4FFAF';
            break;
        default:

    }
    passwordQuality.innerText = text;
    allColorSpan.forEach(element=> element.removeAttribute('style'));
    allColorSpan.slice(0,checkedElementNumber).forEach(element=>{
        element.style.cssText = `
        background-color: #${color};
        border-color: #${color};
        `;
    });
}

function changeLetter(){
    const {value,max,min} = range;
    const progress = range.nextElementSibling;
    const position = (value-min)/(max-min);
    letter.innerText = value;
    progress.style.width = `calc(${position * 100}% + ${4-(position * 4)}px)`;

}

function generate(){
    const [Uletter,Lletter,number,symbol] = allCheckBox;
    const characters1 = [...Uletter.checked?alphabetUpperCase:[],...Lletter.checked?alpabetLowerCase:[],...number.checked?numbers:[],...symbol.checked?symbols:[]];
    let characters2 = [];

    while(true){
        if(characters2.length == characters1.length){
            break;
        }else{
            const x = Random(0,characters1.length-1)
            if(characters2.every(character=> character != characters1[x])){
                characters2.push(characters1[x]);
            }
        }
    };

    while(true){
        const generatedPassWord = checkAll(characters2,range.value);
        if(generatedPassWord){
            showPassword.innerHTML = generatedPassWord.join('');
            break;
        }
    };
}

function checkAll(characters,length) {
    let password=[];
    const [Uletter,Lletter,number,symbol] = allCheckBox;
    for(let x = 0; x < length; x++){
        password.push(characters[Random(0,characters.length -1)]);
    }

    if(Uletter.checked && !alphabetUpperCase.some(a=> password.some(p=> a===p))){
        return false
    }

    if(Lletter.checked && !alpabetLowerCase.some(a=> password.some(p=> a===p))){
        return false
    }

    if(number.checked && !numbers.some(a=> password.some(p=> a===p))){
        return false
    }
    if(symbol.checked && !symbols.some(a=> password.some(p=> a===p))){
        return false
    }

    return password;
}

function Random(min,max){
    return Math.round(Math.random() * (max-min)) + min;
}

changeLetter();
changeColor();
