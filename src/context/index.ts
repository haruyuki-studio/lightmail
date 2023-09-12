import { Mail } from "../utils/types";
import { faker } from "@faker-js/faker";

const folderTypes = ["Github", "Linuxdeepin"];
const folderKeep = ["Inbox", "Sent", "Drafts", "Trash"];

function createRandomUser() {
  return {
    _id: faker.string.uuid(),
    title: faker.string.alpha({ length: 20 }),
    body: faker.string.alpha({ length: 200 }),
    date: faker.date.anytime(),
    sender: faker.person.fullName(),
    from: faker.internet.email(),
    to: Array.from({ length: 5 }, () => faker.internet.email()),
    folder: faker.helpers.arrayElement<string>(folderTypes.concat(folderKeep)),
    star: faker.datatype.boolean(),
    avatar: faker.image.avatarGitHub(),
  };
}

const mails: Mail[] = Array.from({ length: 10 }, () => {
  return createRandomUser();
});

const folders: string[] = [];

for (let mail of mails) {
  let isFound = false;
  for (let f of folders) {
    if (f == mail.folder) {
      isFound = true;
      break;
    }
  }

  if (!isFound) {
    folders.push(mail.folder);
  }
}

folders.sort((a, b) => {
  if (folderKeep.includes(a) && folderKeep.includes(b)) {
    return folderKeep.indexOf(a) - folderKeep.indexOf(b);
  } else if (folderKeep.includes(a)) {
    return -1;
  } else if (folderKeep.includes(b)) {
    return 1;
  } else {
    return a === b ? 0 : a < b ? -1 : 1;
  }
});

export { mails, folders };
