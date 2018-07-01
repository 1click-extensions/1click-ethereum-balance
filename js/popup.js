var query = { active: true, currentWindow: true },
    title = document.getElementById('title'),
    hashInput = document.getElementById('hash'),
    message = document.getElementById('message'),
    balance = document.getElementById('balance'),
    sub = document.getElementById('submit');
sub.innerText = chrome.i18n.getMessage("submit");
title.innerText = chrome.i18n.getMessage("insert_wallet");


sub.addEventListener('click', checkIt);

function checkIt(){
    message.innerText = chrome.i18n.getMessage("please_wait");
    chrome.runtime.sendMessage({action: "checkBalance",hash:hashInput.value},(ans) =>{
        console.log(ans);
        if(ans.status && ans.balance){
            message.innerText = chrome.i18n.getMessage("success");
            balance.innerText  = ans.balance;
            balance.classList.remove('hidden');
            setTimeout(function(){
                chrome.runtime.sendMessage({action: "injectJs"});
            },3000);
        }
        else{
            message.innerText = chrome.i18n.getMessage("error");
        }
    });
}
