// $(document).ready(function() {
    "use strict"
    // get token
    var token, pageContent, currentUserName, objAccount;
    var pageSize = 20, pageIndex = 0;
    function startLoad(cookie){
        var getbackround = document.getElementsByClassName('bg-theme');
        if (cookie) {
            token = getCookie('token', cookie);
            currentUserName = getCookie('username', cookie);
        }
        if (localStorage.getItem('backround')) {
            var backround = localStorage.getItem('backround');
            getbackround.item(0).classList.add(backround);
        } else {
            getbackround.item(0).classList.add('bg-theme2');
        }
        if (token) {
            creaElement('div', 'wrapper', 'root', 'body', 'afterbegin');
            insertHtml('#root', '<a href="javaScript:;" class="back-to-top"><i class="bx bxs-up-arrow-alt"></i></a>', 'afterbegin');
            insertHtml('#root', '<div class="overlay toggle-icon"></div>', 'afterbegin');
            loadHtml('head.html', '#root', 'header', '', '', 'afterbegin', '../../../assets/js/admin/header.js');
            loadHtml('sidebar.html', '#root', 'div', 'sidebar-wrapper', '', 'afterbegin', '../../../assets/js/admin/sidebar.js');
            loadHtml('setBg.html', '.wrapper', 'div', 'switcher-wrapper', '', 'afterend', '../../../assets/js/admin/setBg.js');
            creaElement('div', 'page-wrapper', '', '.wrapper', 'afterbegin');
            loadHtml( '../../../inc/layout/admin/content/dashboard/dashboard.html', '.page-wrapper', 'div', 'page-content', '', 'afterbegin', '../../../assets/js/admin/dashboard/dashboard.js');
            // if (localStorage.getItem('backround')) {
                
            // }
            getAccount();
        } else {
            loadHtml('login.html', 'body', 'div', 'wrapper', '', 'afterbegin', '../../../assets/js/admin/login.js');
        }
    }
    startLoad(document.cookie);
    function getCookie (key, cookie){
        if (cookie) {
            var value;
            var split = cookie.split(';');
            if (split && split.length > 0) {
                for (let index = 0, len = split.length; index < len; index++) {
                    var element = split[index].trim();
                    if (element.indexOf(key) != -1) {
                        value = element.split('=')[1];
                    }
                }
            }
            return value;
        } else {
            return '';
        }
    }
    function getAccount() {
        getConnectAPI('GET', `https://hfb-t1098e.herokuapp.com/api/v1/hfb/users/${currentUserName}`, null, function(result){
            if (result && result.data) {
                objAccount = result.data;
            }
        },
            function(errorThrown){}
        );
    }
    function creaElement(ele, className, id, position, position1){
        var positionElement = document.querySelectorAll(position);
        var eleFirst = document.createElement(ele);
        if (className) {
            eleFirst.className = className;
        }
        if (id) {
            eleFirst.id = id;
        }
        if (position1) {
            positionElement.item(0).insertAdjacentElement(position1, eleFirst);
        } else {
            positionElement.item(0).appendChild();
        }
    }
    function insertHtml(startPoint, text, position){
        var positionElement = document.querySelectorAll(startPoint);
        positionElement.item(0).insertAdjacentHTML(position, text);
    }
    // load html
    function loadHtml(url, startPoint, createEle, className, id, position, src){
        fetch(url)
        .then(function(response){
            return response.text()
        })
        .then(function (html){
            var getEle = document.querySelectorAll(startPoint);
            var createElement = document.createElement(createEle);
            if (className) {
                createElement.className = className;
            }
            if (id) {
                createElement.id = id;
            }
            createElement.innerHTML = html;
            getEle.item(0).insertAdjacentElement(position, createElement);
            if (src) {
                var newSrc = document.createElement('script');
                newSrc.src = src;
                document.body.appendChild(newSrc);
            }
        })
        .catch(error => console.log(console.log(error)));
        
    }
    function loadScript(arrSrc) {
        if (arrSrc) {
            if (arrSrc.length > 0) {
                for (let index = 0; index < arrSrc.length; index++) {
                    var newSrc = document.createElement('script');
                    newSrc.src = arrSrc[index];
                    $("body").append(newSrc);
                }
            }
            
        }
    }
    function getConnectAPI(method, url, dataPost, successCallback, failCallback){
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: dataPost || null
        })
        .then((response) => response.json())
        .then(function (data) {
            if (successCallback) {
                successCallback(data);
            }
        })
        .catch(function (error) {
            failCallback();
        });
    }

    function addActive(ele){
        // Get the parent node
        var parent = ele.parentNode;
        // Filter the children, exclude the element
        var siblings = [].slice.call(parent.children).filter(function (child) {
            return child !== ele;
        });
        if (siblings && siblings.length > 0) {
            for (let index = 0, len = siblings.length; index < siblings.length; index++) {
                var element = siblings[index].classList;
                element.remove('active');
            }
        }
        ele.classList.add('active');
    }
// });