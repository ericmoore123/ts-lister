export interface Item {
    id: String,
    item: String,
    checked: boolean
}

// Model class for creating list items
export default class ListItem implements Item {
    constructor(
        private _id: string, 
        private _item: string, 
        private _checked: boolean
        ) {
            this._id = '',
            this._item = '',
            this._checked = false
    };

    get id(): string { return this._id; };
    set id(id: string) { this._id = id;};

    get item(): string { return this._item; };
    set item(item: string) { this._item = item};

    get checked(): boolean { return this._checked; };
    set checked(checked: boolean) { this._checked = checked;};
}