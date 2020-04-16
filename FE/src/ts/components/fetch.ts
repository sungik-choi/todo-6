import { Card } from './card';
import { templateCardElement } from './card';
import { templateSideMenuElement } from './sidemenu';
import { initialRender } from './columnWrap';

const API_URL = {
  BASE_URL: 'http://15.165.109.219:8080',
  todoList(): string {
    return `${this.BASE_URL}/api/todo`;
  },
  activityList(): string {
    return `${this.BASE_URL}/api/activity`;
  },
  addCard(columnId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card`;
  },
  deleteCard(columnId: number, cardId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card/${cardId}`;
  },
  editCard(columnId: number, cardId: number): string {
    return `${this.BASE_URL}/api/column/${columnId}/card/${cardId}`;
  },
  moveCard(sourceColumnId: number, destinationColumnId: number, cardId: number, cardPosition: number): string {
    return `${this.BASE_URL}/api/column/${sourceColumnId}/card/${cardId}?destination=${destinationColumnId}&position=${cardPosition}`;
  },
};

const JWT_TOKEN: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoibHlubiIsImV4cCI6MTQ4NTI3MDAwMDAwMH0.LGcj3yDql6M-9s21JXgDw4kYokbQ1t919FdjVkai7bE';

export interface Sections {
  id: number;
  name: string;
  card: Array<Card>;
}

interface ApiParameter {
  columnId?: number;
  cardId?: number;
  title?: string;
  contents?: string | null;
  sourceColumnId?: number;
  destinationColumnId?: number;
  cardPosition?: number;
}

const myHeaders: Headers = new Headers({
  Authorization: JWT_TOKEN,
  'Content-Type': 'application/json',
});

export const fetchTodoList = async (): Promise<void> => {
  const response: Response = await fetch(API_URL.todoList(), { method: 'GET', headers: myHeaders });
  const todoList = await response.json();
  const { data } = todoList;
  initialRender(data);
};

export const fetchActivityList = async (targetElement: HTMLElement): Promise<void> => {
  const response: Response = await fetch(API_URL.activityList(), { method: 'GET', headers: myHeaders });
  const activityList = await response.json();
  const { data } = activityList;
  console.log(data);
  targetElement.innerHTML = templateSideMenuElement(data);
};

export const createCard = async ({ columnId, title, contents }: ApiParameter): Promise<string> => {
  const response: Response = await fetch(API_URL.addCard(columnId), {
    method: 'POST',
    body: JSON.stringify({ title: title, contents: contents }),
    headers: myHeaders,
  });
  const addedCard = await response.json();
  console.log(addedCard);
  const { data } = addedCard;
  return templateCardElement(columnId, data);
};

export const isCardDeleted = async ({ columnId, cardId }: ApiParameter): Promise<boolean> => {
  const response: Response = await fetch(API_URL.deleteCard(columnId, cardId), {
    method: 'DELETE',
    headers: myHeaders,
  });
  console.log(response);
  return response.ok;
};

export const isCardEdited = async ({ columnId, cardId, title, contents }: ApiParameter): Promise<boolean> => {
  console.log(columnId, cardId, title, contents);
  const response: Response = await fetch(API_URL.editCard(columnId, cardId), { method: 'PUT', body: JSON.stringify({ title: title, contents: contents }), headers: myHeaders });
  console.log(response);
  return response.ok;
};

export const isCardMoved = async ({ sourceColumnId, destinationColumnId, cardId, cardPosition }: ApiParameter): Promise<boolean> => {
  const response: Response = await fetch(API_URL.moveCard(sourceColumnId, destinationColumnId, cardId, cardPosition), { method: 'GET', headers: myHeaders });
  console.log(response);
  return response.ok;
};
