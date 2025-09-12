import { PenLine, Plus, Trash2 } from "lucide-react";
import CustomTable from "@/components/custom/CustomTable";
import CustomModal from "@/components/custom/CustomModal";
import {
  addCategory,
  deleteCategory,
  getAdminCategory,
  updateCategory,
} from "../apiCall";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoaderTable from "@/components/custom/LoaderTable";
import CustomAlert from "@/components/custom/CustomAlert";
import { toast } from "sonner";

type Category = {
  serialNo: number;
  categoryName: string;
  noOfQue: string;
  status: JSX.Element;
  actions: JSX.Element;
};

const AddCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const headerData = [
    { title: "SL No.", key: "serialNo" as const },
    { title: "Category Name", key: "categoryName" as const },
    { title: "No. of Questions", key: "noOfQue" as const },
    { title: "Status", key: "status" as const },
    { title: "Actions", key: "actions" as const },
  ];

  const handleGetCategory = async () => {
    try {
      setLoading(true);
      const response = await getAdminCategory();

      setCategoryList(
        response?.data.map((d: any, index: number) => ({
          serialNo: index + 1,
          categoryName: d.title,
          noOfQue: d.noOfQue,
          status: d.isActive ? (
            <p className="text-green-500">Active</p>
          ) : (
            <p className="text-red-500">Inactive</p>
          ),
          actions: (
            <div className="flex gap-2">
              <PenLine
                onClick={() => handleSelect(d)}
                size={20}
                className="cursor-pointer text-yellow-500 hover:text-yellow-700"
              />
              <CustomAlert
                title="Delete Category"
                description="Are you sure you want to delete this category?"
                onContinue={() => handleDeleteCategory(d._id)}
              >
                <Trash2
                  size={20}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                />
              </CustomAlert>
            </div>
          ),
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (selectedCategory) {
      if (!categoryTitle.trim()) {
        toast("Category title cannot be empty");
        return;
      }

      try {
        const res = await updateCategory(
          { title: categoryTitle },
          selectedCategory._id
        );

        if (res?.success) {
          toast("Category updated successfully");
          setCategoryTitle("");
          setIsModalOpen(false);
          handleGetCategory();
        } else {
          toast(res?.msg || "Failed to update category");
        }
      } catch (error: any) {
        toast(error?.msg || "Something went wrong");
      }

      return; // prevent addCategory from running
    }

    if (categoryTitle.trim()) {
      try {
        const res = await addCategory({ title: categoryTitle });

        if (res?.status) {
          toast("Category added successfully");
          setCategoryTitle("");
          setIsModalOpen(false);
          handleGetCategory();
        } else {
          toast(res?.msg || "Failed to add category");
        }
      } catch (error: any) {
        toast(error?.msg || "Something went wrong");
      }
    } else {
      toast("Category title cannot be empty");
    }
  };

  const handleSelect = (category: any) => {
    setSelectedCategory(category);
    setCategoryTitle(category.title);
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleGetCategory();
  }, []);
  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      if (res) {
        handleGetCategory();
      }
    } catch (error) {
      toast("Failed to delete category");
    }
  };
  return (
    <div className="w-full h-[90vh]">
      <div className="flex justify-end w-full px-6 pr-8 pt-2">
        <CustomModal
          isOpen={isModalOpen}
          handleOpen={setIsModalOpen}
          dialogTitle={selectedCategory ? "Edit Category" : "Add Category"}
          dialogDescription="Question Category, e.g : General Knowledge, Current Affairs"
          label="Category"
          placeholder="Enter category"
          onClick={handleClick}
          categoryTitle={categoryTitle}
          setCategoryTitle={setCategoryTitle}
        >
          <Button
            variant={"outline"}
            onClick={() => {
              setSelectedCategory(null);
              setCategoryTitle("");
              setIsModalOpen(true);
            }}
          >
            <Plus size={16} />
          </Button>
        </CustomModal>
      </div>

      {loading ? (
        <LoaderTable />
      ) : (
        <CustomTable rowsData={categoryList} headerData={headerData} />
      )}
    </div>
  );
};

export default AddCategory;
