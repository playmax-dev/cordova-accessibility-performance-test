/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

var currentPage = 2;

function goPage(page)
{
    currentPage = page;
    let pages = document.querySelectorAll('.pages .page');

    for(let i = 0, len = pages.length; i < len; i++)
    {
        if(displayNone)
            pages[i].style.display = 'none';
        else
            pages[i].style.display = 'block';

        pages[i].style.zIndex = '1';
    }

    page = document.querySelector('.pages .page--'+page);
    if(page && displayNone) page.style.display = 'block';
    if(page) page.style.zIndex = '2';
}

function addElements(toAdd = 500)
{
    let parentNode = this.nextElementSibling;
    while(parentNode.nextElementSibling)
    {
        if(parentNode.tagName === 'DIV')
            break;

        parentNode = parentNode.nextElementSibling;
    }

    let len = parentNode.children.length;

    for(let i = 0; i < toAdd; i++)
    {
        var paragraph = document.createElement('div');
        paragraph.innerHTML = 'Line '+(i + len);
        parentNode.appendChild(paragraph);
    }

    let previousElement = this.previousElementSibling;
    while(previousElement.previousElementSibling)
    {
        if(previousElement.tagName === 'DIV')
            break;

        previousElement = previousElement.previousElementSibling;
    }

    if(this.previousElementSibling) previousElement.innerHTML = (parentNode.children.length)+' elements';
}

var goTabST = false;

function goTab(tab)
{
    if(document.querySelector('.tabContent active.tab--'+tab))
        return;

    clearTimeout(goTabST);

    // tab buttons
    let tabButtons = document.querySelectorAll('.tabButtons > div');

    for(let i = 0, len = tabButtons.length; i < len; i++)
    {
        tabButtons[i].classList.remove('active');
    }

    this.classList.add('active');

    // Tab content
    let translate = (tab - 1) * 25;

    let tabContent = document.querySelector('.tabContent > div');
    if(tabContent) tabContent.style.transform = 'translate(-'+translate+'%, 0px)';

    let startVisible = false;
    let tabs = document.querySelectorAll('.tabContent > div > div');

    for(let i = 0, len = tabs.length; i < len; i++)
    {
        if(tabs[i].classList.contains('active') || tabs[i].classList.contains('tab--'+tab))
        {
            startVisible = !startVisible;
            tabs[i].classList.add('visible');
        }
        else if(startVisible)
        {
            tabs[i].classList.add('visible');
        }

        tabs[i].classList.remove('active');
    }

    tab = document.querySelector('.tabContent .tab--'+tab);
    if(tab) tab.classList.add('active');

    goTabST = setTimeout(function(){

        let tabs = document.querySelectorAll('.tabContent > div > div');

        for(let i = 0, len = tabs.length; i < len; i++)
        {
            tabs[i].classList.remove('visible');
        }

    }, 300);
}

var displayNone = true;

function switchDisplayNone()
{
    displayNone = !displayNone;

    let displayNoneButton = document.querySelector('.displayNoneButton');
    displayNoneButton.innerHTML = displayNone ? 'Disable display: none when change page' : 'Enable display: none when change page';

    goPage(currentPage);
}