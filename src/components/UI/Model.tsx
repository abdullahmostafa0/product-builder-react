import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {  type ReactNode } from "react";


interface IProps {
    isOpen: boolean;
    close: () => void;
    title?: string;
    children: ReactNode;
}
const Model = ({isOpen,  close, title, children}: IProps) => {
    
    return <div>
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/100 p-6 "
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                                {title}
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-black">
            
                            </p>
                            <div className="mt-4">
                                {children}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    </div>;
};

export default Model;