import './css/style.css'
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './template/ListTemplate';

const initApp = (): void => {
    // Grab singleton instances
    const fullList = FullList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.querySelector('#itemEntryForm') as HTMLFormElement;
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();

        const input = document.querySelector('#newItem') as HTMLInputElement;
        const newEntryText = input.value.trim();
        if (!newEntryText) return;

        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1; 
        
        const newItem = new ListItem(itemId.toString(), newEntryText);
        fullList.addItem(newItem);
        
        // Render full list after addition
        template.render(fullList);
    });

    const clearItems = document.querySelector('#clearItemsButton') as HTMLButtonElement;
    clearItems.addEventListener('click', (): void => {
        fullList.clearList();
        template.clear();
    });

    fullList.load();
    template.render(fullList);
};

// Call initializer on DOM items loaded
document.addEventListener('DOMContentLoaded', initApp);
