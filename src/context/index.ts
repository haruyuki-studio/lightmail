import { Mail } from "../utils/types";
import { faker } from "@faker-js/faker";

// const folderTypes = ["Github", "Linuxdeepin"];
// const folderKeep = ["Inbox", "Sent", "Drafts", "Trash"];

function createRandomUser(): Mail {
  return {
    _id: faker.string.uuid(),
    subject: faker.string.alpha({ length: 20 }),
    html: faker.string.alpha({ length: 200 }),
    date: faker.date.anytime(),
    from: {
      address: faker.internet.email(),
      raw: "",
    },
    to: Array.from({ length: 5 }, () => {
      return {
        address: faker.internet.email(),
        raw: "",
      };
    }),
    // folder: faker.helpers.arrayElement<string>(folderTypes.concat(folderKeep)),
    // star: faker.datatype.boolean(),
    avatar: faker.image.avatarGitHub(),
  };
}

const mails: Mail[] = Array.from({ length: 10 }, () => {
  return createRandomUser();
});

// const folders: string[] = [];

// for (let mail of mails) {
//   let isFound = false;
//   for (let f of folders) {
//     if (f == mail.folder) {
//       isFound = true;
//       break;
//     }
//   }

//   if (!isFound) {
//     folders.push(mail.folder);
//   }
// }

// folders.sort((a, b) => {
//   if (folderKeep.includes(a) && folderKeep.includes(b)) {
//     return folderKeep.indexOf(a) - folderKeep.indexOf(b);
//   } else if (folderKeep.includes(a)) {
//     return -1;
//   } else if (folderKeep.includes(b)) {
//     return 1;
//   } else {
//     return a === b ? 0 : a < b ? -1 : 1;
//   }
// });

export { mails };
