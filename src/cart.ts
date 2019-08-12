// TODO: create Product type somewhere?
export type CartItem = {
    id: string,
    price: number,
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
}