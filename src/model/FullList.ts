import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObject: ListItem): void,
    removeItem(id: string): void,
};

export default class FullList implements List {

    /* A Singleton is a creational design pattern, which ensures that only one object of its kind 
    exists and provides a single point of access to it for any other code.
    */
    static instance: FullList = new FullList();

    private constructor(private _list: Array<ListItem> = []) { };

    get list(): Array<ListItem> {
        return this._list;
    };

    load(): void {
        const storedList: string | null = localStorage.getItem('myList');
        if (typeof storedList !== "string") return;

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList);
        
        parsedList.forEach(itemObject => {
            const newListItem = new ListItem(itemObject._id, itemObject._item, itemObject._checked);
            FullList.instance.addItem(newListItem);
        });
    };

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    };

    clearList(): void {
        this._list = [];
        this.save();
    };

    addItem(itemObject: ListItem): void {
        this._list.push(itemObject);
        this.save();
    };

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    };

}