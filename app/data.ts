////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSsEgGDtay7yynbtJCdRRvuLW0dWTzG3_BDf36Vo0flnkq7E_BJpr3-EclLGqYfPhIn-REwJqGs0lcfgpU6M34pYibADP7HTCHvX9jwZA",
    first: "Playa del Carmen",
    last: "México",
    twitter: "@playadelcarmen",
  },
  {
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSKEchVmyIPbv1XBHQVjbCGSu7ELlk46OgcW6MoKl6upCUiKu7wUP0K0E-mRbjo_m24dJMpjn5hbxr_SWgU5-Irm43Ay4cHtFjA_AOd-w",
    first: "Santorini",
    last: "Grecia",
    twitter: "@santorini",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipMVfyWlbwj-OyndRaLB8OcBQ3qFQffDq343NUNj=w540-h312-n-k-no",
    first: "Cartagena",
    last: "Colombia",
    twitter: "@cartagena",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipOxwFRsHTWMWABPquEmNX4bIqjJk8Gu5YYoeFvs=w540-h312-n-k-no",
    first: "Barcelona",
    last: "España",
    twitter: "@barcelona",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipNPJSyPRk-i6wRJQ3IJwjCxE2qdbGXCFpkXQ_LR=w540-h312-n-k-no",
    first: "Lisboa",
    last: "Portugal",
    twitter: "@lisboa",
  },
  {
    avatar:
      "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQ-SfIII1xLSAS3oV3zrIJG83_dEcpy0Lg5VfycEokHpeYo0xeI7rGambr0tYacAtaUKn6pR5NrEZ4RQmPmyUhkyG13FPrmAfaCDY6wKQ",
    first: "Bariloche",
    last: "Argentina",
    twitter: "@bariloche",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipMC6smIuDIlHhsE4OWqUZxEn3t8uqgI_aSlFmaA=w540-h312-n-k-no",
    first: "Interlaken",
    last: "Suiza",
    twitter: "@interlaken",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipORjUq02fgtogOziVA5Qe5JxJGHlRatzuhMUhf8=w540-h312-n-k-no",
    first: "Cusco",
    last: "Perú",
    twitter: "@cusco",
  },
  {
    avatar:
      "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRxOTQBjLt3480QFzkSlhnnZ0mQVZh4VVnDbBXXlvwv-ya_zuxGyBaKYYBzqp8r2MwBsVRnZl9a3ZJE9GST0V-vExD6FEYqBfT_7LLzBg",
    first: "Granada",
    last: "España",
    twitter: "@granada",
  },
  {
    avatar:
      "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS5i1pBNjrxyDIxWtAVJW_lkrL1AV0NUkXfsAQxDMgrCyCrArqVxTBc7vms74IlKRt2pjDSqpkLtK3dp7IBabCWuJSncQ_NMJq18K0oug",
    first: "Banff",
    last: "Canadá",
    twitter: "@banff",
  },
  {
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSAQcCDSb6m6eo3VJ1mZ8zlT4J3poq2-v3PM0Ph6atAFrnMKHXTClkZLKrkx0vRMPPfGJlApHInz4J3vpZePZ9csZB8K38Sgr-09Hrneg",
    first: "Zermatt",
    last: "Suiza",
    twitter: "@zermatt",
  },
  {
    avatar:
      "https://lh5.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=w540-h312-n-k-no",
    first: "New York",
    last: "Estados Unidos",
    twitter: "@newyork",
  },
  {
    avatar:
      "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQB19lTbuMXK3ICGgIQium_8s9s3aWQyeCqY6_k4EHJE8Bqfwsj_bHFtzpOInjAbBrVo98xmieHU1-pRhEDJ941EUyPRa7BpiF1V5o9KA",
    first: "París",
    last: "Francia",
    twitter: "@paris",
  },
  
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
