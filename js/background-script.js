document.addEventListener('keydown', hotKey);
setTimeout(removeComments, 1000);

function hotKey(e) {
	if ((e.altKey && e.key === 'g') || (e.altKey && e.key === 'п')) {
		getDataGroupDamage();
	} else if ((e.altKey && e.key === 'n') || (e.altKey && e.key === 'т')) {
		addComment('Необходимо дозвониться до клиента, при ответе – перевести на 2 ЛТП');
	} else if ((e.altKey && e.key === 'x') || (e.altKey && e.key === 'ч')) {
		copySipal();
	}
} 

function removeComments() {
	if (document.querySelector("#history_tabs-history_form-changes_checkbox_panel > div.ui-selectcheckboxmenu-items-wrapper > ul")) {
		let commentList = document.querySelector("#history_tabs-history_form-changes_checkbox_panel > div.ui-selectcheckboxmenu-items-wrapper > ul");
		let checkBoxes = commentList.querySelectorAll('.ui-helper-hidden-accessible');
		for (let checkBox of checkBoxes) {
			checkBox.firstElementChild.click();
		}
	}
}

function getDataGroupDamage() {
	let device = document.querySelector("#inst_tab_view > ul").children[1].firstElementChild;
	device.click();
	setTimeout(() => {
		let incident = myDecoder.decode('Номер обращения: ') + Number(document.querySelector("#bi_header-header_frame > h3 > span.heading-accent").textContent.replace(/\D+/g, ""));
		let personalAccount = myDecoder.decode('Лицевой счет: ') + Number(document.querySelector("#installation_edit_form > div > dl > dd:nth-child(2)").textContent.replace(/\D+/g, ""));
		let address = myDecoder.decode('Адрес: ') + myDecoder.decode(document.querySelector("#client_address").textContent.trim());
		let location = document.querySelector('.entity');
		let device = document.querySelector("#inst_tab_view-st_eq-acc_dev > span.entity");
		let locationText = '';
		let deviceText = '';
		if(location && device) {
			locationText = myDecoder.decode('Расположение: ') + myDecoder.decode(location.textContent);
			deviceText = myDecoder.decode('Оборудование: ') + myDecoder.decode(device.textContent);
		}
		let result = `mailto:Andrey.Danilenko@nw.rt.ru; Maksim.Kozlov@nw.rt.ru&cc=Marina.Korkina@nw.rt.ru; Mariya.A.Ischenko@nw.rt.ru&body=${incident}%0D%0A${personalAccount}%0D%0A${address}%0D%0A${locationText}%0D%0A${deviceText}%0D%0A${myDecoder.decode('Плата: ')}%0D%0A${myDecoder.decode('Порт: ')}%0D%0A${myDecoder.decode('Описание: ')}?subject=${myDecoder.decode("Эскалация ГП")}`;
		window.open(result);

	}, 3000);
}

function addComment(msg) {
	let messageField = document.querySelector("#history_tabs-history_form-new_comment");
	messageField.value = msg;
	document.querySelector("#history_tabs-history_form-add_comment").click();
}

function copySipal() {		 
	let copyButton = document.querySelector("body > div.webix_view.webix_scrollview > div > div > div.webix_view.webix_layout_wide > div.webix_view.webix_layout_clean > div.webix_view.webix_layout_clean > div.webix_view.webix_multiview > div > div.webix_view.webix_layout_space > div:nth-child(2) > div").lastElementChild.lastElementChild;
	copyButton.click();
	let info = document.querySelector("body > div:nth-child(80) > div > div.webix_win_body > div > div > div.webix_view.webix_control.webix_el_textarea > div").firstElementChild;
	info.select();
	document.execCommand("copy");
	let buttonClose = document.querySelector("body > div:nth-child(80) > div > div.webix_win_body > div > div > div.webix_view.webix_control.webix_el_button > div > button");
	buttonClose.click();
}

const myDecoder = {
    symbolKeeper: new Map([
        ['~', '%7E'],
        ['`', '60%'],
        ['\'', '27%'],
        ['"', '22%'],
        ['@', '40%'],
        ['?', '%3F'],
        ['!', '21%'],
        ['#', '23%'],
        ['№', '%B9'],
        ['$', '24%'],
        ['%', '25%'],
        ['^', '%5E'],
        ['&', '26%'],
        ['+', '%2B'],
        ['*', '%2A'],
        [':', '%3A'],
        [',', '%2C'],
        ['(', '%28'],
        [')', '%29'],
        ['{', '%7B'],
        ['}', '%7D'],
        ['[', '%5B'],
        [']', '%5D'],
        ['<', '%3C'],
        ['>', '%3E'],
        ['/', '%2F'],
        [' ', '%20'],
        ['А', '%C0'],
        ['а', '%E0'],
        ['Б', '%C1'],
        ['б', '%E1'],
        ['В', '%C2'],
        ['в', '%E2'],
        ['Г', '%C3'],
        ['г', '%E3'],
        ['Д', '%C4'],
        ['д', '%E4'],
        ['Е', '%C5'],
        ['е', '%E5'],
        ['Ё', '%A8'],
        ['ё', '%B8'],
        ['Ж', '%C6'],
        ['ж', '%E6'],
        ['З', '%C7'],
        ['з', '%E7'],
        ['И', '%C8'],
        ['и', '%E8'],
        ['Й', '%C9'],
        ['й', '%E9'],
        ['К', '%CA'],
        ['к', '%EA'],
        ['Л', '%CB'],
        ['л', '%EB'],
        ['М', '%CC'],
        ['м', '%EC'],
        ['Н', '%CD'],
        ['н', '%ED'],
        ['О', '%CE'],
        ['о', '%EE'],
        ['П', '%CF'],
        ['п', '%EF'],
        ['Р', '%D0'],
        ['р', '%F0'],
        ['С', '%D1'],
        ['с', '%F1'],
        ['Т', '%D2'],
        ['т', '%F2'],
        ['У', '%D3'],
        ['у', '%F3'],
        ['Ф', '%D4'],
        ['ф', '%F4'],
        ['Х', '%D5'],
        ['х', '%F5'],
        ['Ц', '%D6'],
        ['ц', '%F6'],
        ['Ч', '%D7'],
        ['ч', '%F7'],
        ['Ш', '%D8'],
        ['ш', '%F8'],
        ['Щ', '%D9'],
        ['щ', '%F9'],
        ['Ъ', '%DA'],
        ['ъ', '%FA'],
        ['Ы', '%DB'],
        ['ы', '%FB'],
        ['Ь', '%DC'],
        ['ь', '%FC'],
        ['Э', '%DD'],
        ['э', '%FD'],
        ['Ю', '%DE'],
        ['ю', '%FE'],
        ['Я', '%DF'],
        ['я', '%FF'],
    ]),
    decode: function (str) {
        let result = '';
        for (const ch of str) {
            if (this.symbolKeeper.get(ch)) {
                result += this.symbolKeeper.get(ch);
            } else {
                result += ch;
            }
        }
        return result;
    },
}