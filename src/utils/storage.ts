function stringify(value: any): string {
    return JSON.stringify(value);
}

function parse<T>(value: string): T | null {
    try {
        return JSON.parse(value) as T;
    } catch (error) {
        return null;
    }
}

interface RLocalStore {
    setValue(key: string, data: any): RLocalStore;
    getValue<T>(key: string, defaultValue?: T): T | null;
    removeValue(key: string): RLocalStore;
}
const LocalStore: RLocalStore = {
    setValue(key: string, data: any): RLocalStore {
        localStorage.setItem(key, stringify(data));
        return this;
    },
    getValue<T>(key: string, defaultValue?: T): T | null {
        const value = localStorage.getItem(key);

        if (!value) return defaultValue || null;
        const data = parse<T>(value);
        return data;
    },
    removeValue(key: string): RLocalStore {
        localStorage.removeItem(key);
        return this;
    },
};

export default LocalStore;
