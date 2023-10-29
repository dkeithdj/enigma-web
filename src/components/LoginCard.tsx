import { auth } from "@/firebase/client";
import {
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const LoginCard = () => {
  auth.setPersistence(inMemoryPersistence);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      const res = await fetch("/api/auth/signin", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (res.redirected) {
        window.location.assign(res.url);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card className="w-auto">
      <CardHeader>
        <CardContent className="flex justify-center items-center">
          <div className="w-[200px]">
            <img src="/enigma-horizontalv3.svg" alt="enigma" />
          </div>
        </CardContent>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
        <CardDescription>Login to access our exclusive content</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </CardContent>
      <CardFooter>
        <div className="space-y-4">
          <div>By using this platform, you agaree to our Privacy Policy</div>
          <div>Need assistance? Send us an email</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
