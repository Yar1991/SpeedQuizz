import { all } from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storageRef = ref(storage);
const imagesRef = ref(storageRef, "images");
const iconsRef = ref(storageRef, "icons");

interface ItemInterface {
  title: string;
  icon: string;
  image: string;
}
const categories: string[] = [
  "sport_and_leisure",
  "science",
  "music",
  "history",
  "geography",
  "food_and_drink",
  "film_and_tv",
  "arts_and_literature",
];

export const getItems = async () => {
  try {
    const allItems: ItemInterface[] = [];
    for await (let category of categories) {
      const imageRef = ref(imagesRef, `${category}.webp`);
      const iconRef = ref(iconsRef, `${category}.svg`);
      const [image, icon] = await Promise.all([
        getDownloadURL(imageRef),
        getDownloadURL(iconRef),
      ]);
      const item: ItemInterface = {
        title: category,
        icon,
        image,
      };
      allItems.push(item);
    }
    return allItems;
  } catch (err: unknown) {
    console.log(err);
  }
};
