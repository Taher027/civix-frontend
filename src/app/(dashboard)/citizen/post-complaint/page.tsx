import PostComplaintForm from "@/components/form/post-complaint-form";
import { allCategories } from "../_Action/getAllCategories";

export default async function PostComplaint() {
  const result = await allCategories();
  const categories = result.success ? result.data : [];
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl h-auto p-6 sm:p-10 bg-white rounded-xl shadow-md border border-gray-100">
        <PostComplaintForm categories={categories} />
      </div>
    </div>
  );
}
