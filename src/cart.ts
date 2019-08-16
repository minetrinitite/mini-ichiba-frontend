// TODO: create Product type somewhere?
export type CartItem = {
    id: string,
    price: number,
    points: number,
    amount: number,
};

export class Cart {
    private items: CartItem[];
    
    constructor () {
        this.items = [];
    }

    addItem (item: CartItem) {
        var existing = this.items.find(entry => item.id === entry.id);
        if (existing) {
            existing.amount += item.amount;
            console.log("added " + item.amount + " to existing item " + existing.id);
        } else {
            this.items.push(item);
            console.log("added new item " + item.id);
        }
    }

    removeItem (item: CartItem) {
        for (var i = 0; i < this.items.length; ++i) {
            if (this.items[i].id === item.id) {
                this.items.splice(i, 1);
            }
        }
    }

    clear () {
        this.items = [];
    }

    getItems () {
        return this.items;
    }

    getItemCount() {
        return this.items.length;
    }

    getTotalCost() {
        var result = 0;
        this.items.forEach(item => result += (item.price * item.amount));
        return result;
    }

    getGrantedPoints() {
        var result = 0;
        this.items.forEach(item => result += (item.points * item.amount));
        return result;
    }
}