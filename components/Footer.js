import { userData } from '../constants/data'

export default function Footer() {
    return (
        <div className="flex flex-col items-center w-full h-24">
            <div className="w-11/12 md:w-full max-w-3xl m-auto flex flex-row items-center justify-center">
                taeheechoi © {new Date().getFullYear()}
            </div>
        </div>

    );
}