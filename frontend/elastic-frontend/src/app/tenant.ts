export interface Tenant {
    id: number;
    name: string;
}

export const TENANTS: Tenant[] = [
    { id: 12345, name: 'Pristine Electronics' },
    { id: 12346, name: "Dale's Plumbing" },
    { id: 12347, name: 'Madison Health' },
    { id: 12348, name: 'Hashicorp Services' },
    { id: 12349, name: "Sal's Tire Repair" }
  ];