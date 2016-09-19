var sectionAbout = document.getElementById('sectionAbout');

var personsJSON = '[' +

    '{"name":"Oleksandr Demchenko",' +
    '"feedback":"The load time of the page is quite  fast.",' +
    '"photo":"od.jpg"},' +
    '{"name":"Dmytro Demchenko",' +
    '"feedback":"The design is very  professional and well done.",' +
    '"photo":"dd.jpg"},' +
    '{"name":"Daria Chekh",' +
    '"feedback":"The  content  flows very well and is well  written.",' +
    '"photo":"dc.jpg"}]';

var persons = JSON.parse(personsJSON);

var fl = document.createElement('ul');

fl.classList = 'feedbackList';

for(var i = 0; i < 3; i++){
    var flItem = document.createElement('li');
    flItem.className = 'feedbackList__item wow bounceIn';

    var flPhoto = document.createElement('div');
    flPhoto.className = 'feedbackList__item-photo';
    flPhoto.style.backgroundImage = "url(images/" + persons[i]["photo"] + ")";

    var flName = document.createElement('span');
    flName.className = 'feedbackList__item-name';
    flName.textContent = persons[i]["name"];

    var flFeedback = document.createElement('span');
    flFeedback.className = 'feedbackList__item-feedback';
    flFeedback.textContent = persons[i]["feedback"];

    flItem.appendChild(flPhoto);
    flItem.appendChild(flName);
    flItem.appendChild(flFeedback);

    fl.appendChild(flItem);
}

sectionAbout.appendChild(fl);

sectionAbout.addEventListener("click", showFeedback);

function showFeedback(event){
    var target = event.target;
    while (target != 'UL') {
        if (target.parentNode.tagName == 'LI') {
            setFeedback(target);
            return;
        }
        target = target.parentNode;
    }
}

function setFeedback(target){
    var tmp1 = fl.childNodes[1].cloneNode(true);
    var tmp2 = target.parentNode.cloneNode(true);

    fl.replaceChild(tmp2, fl.childNodes[1]);
    fl.replaceChild(tmp1, target.parentNode);
}