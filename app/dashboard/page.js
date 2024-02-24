import Navbar from "@/components/navbar";

export default async function Page() {
    return (
        <>
            <div className="px-8 py-4">
                <h1>Dashboard</h1>
                <p>
                    You are signed in as{" "}
                    {/* <strong>{JSON.stringify(session)}</strong>. */}
                </p>
            </div>
        </>
    );
}
