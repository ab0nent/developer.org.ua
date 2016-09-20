var sectionAbout = document.getElementById('sectionAbout');
var persons = '';
var fl = document.createElement('ul');
fl.classList = 'feedbackList';
var xhr = new XMLHttpRequest();
var url = "data/feedbacks.json";

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        persons = JSON.parse(this.responseText);

        for(var i = 0; i < 3; i++){
            var flItem = document.createElement('li');
            flItem.className = 'feedbackList__item wow bounceIn';

            var flPhoto = document.createElement('img');
            flPhoto.className = 'feedbackList__item-photo';
            flPhoto.src = "images/" + persons[i]["photo"];

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

        fl.addEventListener("click", showFeedback);
    }
};

xhr.open("GET", url, true);
xhr.send();

function showFeedback(event){
    var target = event.target;

    while (target.tagName != 'UL') {
        if (target.tagName == 'IMG') {

            if(target.parentNode == target.parentNode.parentNode.childNodes[1]){
                return;
            }
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