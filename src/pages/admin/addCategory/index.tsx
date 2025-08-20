import { PenLine, Plus, Trash2 } from "lucide-react";
import CustomTable from "@/components/custom/CustomTable";
import CustomModal from "@/components/custom/CustomModal";
import { addCategory, getAdminCategory, updateCategory } from "../apiCall";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoaderTable from "@/components/custom/LoaderTable";

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
              <Trash2
                size={20}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
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
      await updateCategory({ title: categoryTitle }, selectedCategory._id);
      setCategoryTitle("");
      setIsModalOpen(false);
      handleGetCategory();
      return;
    }
    if (categoryTitle.trim()) {
      await addCategory({ title: categoryTitle });
      setCategoryTitle("");
      setIsModalOpen(false);
      handleGetCategory();
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

  return (
    <div className="w-full h-[90vh]">
      <div className="flex justify-end w-full px-6 pr-8 pt-2">
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
      </div>

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
      ></CustomModal>

      {loading ? (
        <LoaderTable />
      ) : (
        <CustomTable rowsData={categoryList} headerData={headerData} />
      )}
    </div>
  );
};

export default AddCategory;
