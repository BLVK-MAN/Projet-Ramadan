import { SadaqaProvider } from "@/components/context/sadaqa-context";

export default function DashboardLayout({
    children,
    chat,
    explorer,
}: {
    children: React.ReactNode;
    chat: React.ReactNode;
    explorer: React.ReactNode;
}) {
    return (
        <SadaqaProvider>
            <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
                <main className="flex w-full">
                    <div className="w-1/2 border-r border-gray-200 dark:border-gray-800 p-4">
                        {chat}
                    </div>
                    <div className="w-1/2 p-4">
                        {explorer}
                    </div>
                </main>
            </div>
        </SadaqaProvider>
    );
}
