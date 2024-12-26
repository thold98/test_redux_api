import React, { useState, useRef } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import bodyBg from "../assets/img/body_bg.jpg";
import CustomInput from "../components/Form/Input";
import CustomCheckboxGroup from "../components/Form/CheckboxGroup";
import AvatarUpload from "../components/Form/AvatarUpload";
import FileUploadButton from "../components/Form/FileUploadButton";
import { CircularProgress } from "@mui/material";
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const arrFieldInput = [
    { label: "Tên công ty", name: "companyName", placeholder: "Nhập tên công ty" },
    { label: "Số ĐKKD", name: "businessNumber", placeholder: "Nhập số giấy phép kinh doanh" },
    { label: "Địa chỉ công ty", name: "companyAddress", placeholder: "Nhập địa chỉ công ty trên giấy phép KD" },
    { label: "Email", name: "email", type: "email", placeholder: "Nhập email công ty" },
    { label: "Họ tên bạn", name: "contactName", placeholder: "Nhập họ tên" },
    { label: "Vị trí", name: "position", placeholder: "Nhập vị trí" },
]

const UpdateSeller: React.FC = () => {
    const [formData, setFormData] = useState({
        accountType: "company",
        companyName: "",
        businessNumber: "",
        companyAddress: "",
        email: "",
        contactName: "",
        position: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ref = useRef<LoadingBarRef>(null)


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
            setErrors({ ...errors, email: "Email không hợp lệ" });
        } else {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleAccountTypeChange = (type: string) => {
        setFormData({ ...formData, accountType: type });
    };

    const handleFileUpload = (newFiles: File[]) => {
        if (files.length + newFiles.length > 2) {
            alert("Chỉ được phép upload tối đa 2 ảnh.");
            return;
        }
        setFiles([...files, ...newFiles].slice(0, 2));
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Kiểm tra các trường không được để trống
        arrFieldInput.forEach(({ name, label }) => {
            if (!formData[name as keyof typeof formData]?.trim()) {
                newErrors[name] = `${label} không được để trống`;
            }
        });

        // Kiểm tra định dạng email
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        ref.current?.continuousStart()
        console.log('in here')
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            // Focus vào input lỗi đầu tiên
            const firstErrorField = Object.keys(newErrors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
                (errorElement as HTMLElement).focus();
            }
            return;
        }
        setIsSubmitting(true); // Bắt đầu loading
        setTimeout(() => {
            alert("Form hợp lệ, gửi yêu cầu thành công!");
            ref.current?.complete()
            setIsSubmitting(false); // Kết thúc loading
        }, 2000); // Giả lập API call
    };

    return (
        <>
            <LoadingBar color='#f11946' ref={ref} />
            <Box
                sx={{
                    backgroundImage: `url(${bodyBg})`,
                    backgroundSize: "cover",
                    minHeight: "100vh",
                    py: 5,
                }}
            >
                <Container component="form" maxWidth="sm" onSubmit={handleSubmit}
                    onDragOver={(e) => e.preventDefault()} // Ngăn kéo thả
                    onDrop={(e) => e.preventDefault()} // Ngăn kéo thả
                >
                    <Box sx={{ backgroundColor: "#fff", borderRadius: "20px", p: 4 }}>
                        <Typography variant="h5" fontWeight="600">
                            Bổ sung thông tin
                        </Typography>
                        <Typography textAlign="left" sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "19.36px", margin: "6px 0px 30px" }}>
                            Để có thể mua-bán sản phẩm, bạn cần cung cấp bổ sung các thông tin sau
                        </Typography>
                        <Typography textAlign="left" sx={{ fontWeight: "600", fontSize: "16px" }}>
                            Bổ sung thông tin cho tài khoản
                        </Typography>
                        <CustomCheckboxGroup value={formData.accountType} onChange={handleAccountTypeChange} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: '30px',
                                padding: "16px 12px",
                                gap: '18px',
                                border: "1px dashed #FFC900",
                                borderRadius: '10px',
                                backgroundColor: files.length === 2 ? "#FFEFD5" : "#FFEFD5",
                                color: files.length === 2 ? "#121110" : "#3F3E3C",
                                cursor: files.length === 2 ? "not-allowed" : "pointer",
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography sx={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    lineHeight: "16.94px",
                                    color: "#121110",
                                    textAlign: "center"
                                }}>
                                    Tải lên ảnh giấy phép kinh doanh
                                </Typography>
                                <Typography component="div" color="#61605D" sx={{
                                    fontSize: "12px",
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                    lineHeight: "14.52px",
                                    textAlign: "center",
                                }}>
                                    (Vui lòng chọn tối đa 02 ảnh)
                                </Typography>
                            </Box>
                            {/* Nút upload */}
                            <FileUploadButton
                                onFileUpload={handleFileUpload}
                                disabled={files.length === 2}
                            />
                        </Box>
                        {/* Avatar upload */}
                        <AvatarUpload files={files} onRemove={removeFile} />
                        {arrFieldInput.map((field) => (
                            <Box key={field.name} sx={{ mb: 2 }}>
                                <CustomInput
                                    placeholder={field.placeholder}
                                    label={field.label}
                                    name={field.name}
                                    value={formData[field.name as keyof typeof formData]}
                                    type={field.type}
                                    error={!!errors[field.name]} // Boolean để hiển thị lỗi
                                    onChange={handleInputChange}
                                />
                                {errors[field.name] && (
                                    <Typography sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                                        {errors[field.name]}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button variant="contained" sx={{ backgroundColor: "#F1F1EF", color: "#121110" }}>
                                Hủy
                            </Button>
                            <Button type="submit" variant="contained"
                                sx={{
                                    backgroundColor: isSubmitting ? "#B3B3B3" : "#FFA21A",
                                    color: "#121110",
                                    opacity: isSubmitting ? 0.7 : 1,
                                    "&.Mui-disabled": {
                                        cursor: "no-drop"
                                    },
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Box display="flex" alignItems="center" gap="8px">
                                        <CircularProgress size={20} color="inherit" />
                                        Đang gửi...
                                    </Box>
                                ) : (
                                    "Gửi yêu cầu"
                                )}
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent="center" gap="8px" flexDirection="row" mt={3}>
                            <Typography variant="body2" component="div">
                                Bạn đang có vấn đề?{" "}
                            </Typography>
                            <Typography
                                variant="body2"
                                component="span"
                                color="primary"
                                sx={{ cursor: "pointer" }}
                            >
                                Yêu cầu hỗ trợ
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default UpdateSeller;


