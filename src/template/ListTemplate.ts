import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
};

export default class ListTemplate implements DOMList {
    
    ul: HTMLUListElement;
    
    /* A Singleton is a creational design pattern, which ensures that only one object of its kind 
    exists and provides a single point of access to it for any other code.
    */
    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = "";
    }
    
    render(fullList: FullList): void {
        this.clear();

        fullList.list.forEach(item => {
            let li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            let input = document.createElement('input') as HTMLInputElement;
            input.type = 'checkbox';
            input.id = item.id;
            input.tabIndex = 0
            input.checked = item.checked;
            li.append(input);

            input.addEventListener('change', () => {
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement('button') as HTMLButtonElement;
            button.className = "button";
            button.textContent = 'X';
            li.append(button);

            button.addEventListener('click', () => {
               fullList.removeItem(item.id);
               this.render(fullList);
            });

            // Pulls full-list together
            this.ul.append(li);

        })
    }
}

