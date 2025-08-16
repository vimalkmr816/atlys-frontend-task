import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import PostFeed from "@/src/components/postFeed";

async function Home() {
    return (
        <main className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <PostFeed />
            </div>
        </main>
    );
}

export default Home;
