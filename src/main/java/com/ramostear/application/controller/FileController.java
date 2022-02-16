package com.ramostear.application.controller;

import com.ramostear.application.model.FileInfo;
import com.ramostear.application.util.AjaxResult;
import com.ramostear.application.util.FileUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author : ramostear
 * @date : 2019/3/8 0008-15:35
 * https://juejin.cn/post/6844903816303755277
 * https://github.com/ramostear/Spring-Boot-File-Handling-Tutorial
 */
@Controller
public class FileController {

    private static String fileUploadRootDir = null;

    @Value("${file.upload.root.dir.windows}")
    String fileUploadRootDirWindows;

    @Value("${file.upload.root.dir.mac}")
    String fileUploadRootDirMac;

    @Value("${file.upload.root.dir.linux}")
    String fileUploadRootDirLinux;

    private static Map<String, FileInfo> fileRepository = new HashMap<>();

    @PostConstruct
    public void initFileRepository() {
        // 判断文件夹是否存在，不存在就创建
        String osName = System.getProperty("os.name");
        if (osName.startsWith("Mac OS")) {
            // 苹果
            fileUploadRootDir = fileUploadRootDirMac;
        } else if (osName.startsWith("Windows")) {
            // windows
            fileUploadRootDir = fileUploadRootDirWindows;
        } else {
            // unix or linux
            fileUploadRootDir = fileUploadRootDirLinux;
        }
        FileUtil.createDirectories(fileUploadRootDir);

        File file = new File(fileUploadRootDir);        //获取其file对象
        File[] fs = file.listFiles();    //遍历path下的文件和目录，放在File数组中
        for (File f : fs != null ? fs : new File[0]) {                    //遍历File[]数组
            if (!f.isDirectory())        //若非目录(即文件)，则打印
                System.out.println(f);
            FileInfo fileInfo = new FileInfo().setFileName(f.getName());
            fileRepository.put(f.getName(), fileInfo);
        }
//        FileInfo file1 = new FileInfo().setFileName("bg1.jpg");
//        FileInfo file2 = new FileInfo().setFileName("bg2.jpg");
//        FileInfo file3 = new FileInfo().setFileName("bg3.jpg");
//        fileRepository.put(file1.getName(), file1);
//        fileRepository.put(file2.getName(), file2);
//        fileRepository.put(file3.getName(), file3);
    }

    @GetMapping("/files")
    public String files(Model model) {
        Iterator<Map.Entry<String, FileInfo>> it = fileRepository.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, FileInfo> entry = it.next();
            File file = new File(fileUploadRootDir + entry.getValue().getName());
            if (!file.exists()) {
                it.remove();
            }
        }
        model.addAttribute("data", fileRepository.values());
        return "files";
    }


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public String fileUpload(@RequestParam("file") MultipartFile file) throws IOException {

        File convertFile = new File(fileUploadRootDir + file.getOriginalFilename());
        if (convertFile.exists()) {
            return "文件已存在";
        }
        FileOutputStream fileOutputStream = new FileOutputStream(convertFile);
        fileOutputStream.write(file.getBytes());
        fileOutputStream.close();

        FileInfo fileInfo = new FileInfo()
                .setFileName(file.getOriginalFilename());

        fileRepository.put(fileInfo.getName(), fileInfo);

        return "文件上传成功";
    }

   /* @GetMapping("/deleteFile/{fileName}")
    @ResponseBody
    public String deleteFile(@PathVariable(name = "fileName") String fileName) throws FileNotFoundException {
        File file = new File(fileUploadRootDir + fileName);
        if (file.exists() && file.delete()) {
            return "删除成功";
        }
        return "删除失败";
    }*/

    @GetMapping("/deleteFile/{fileName}")
    @ResponseBody
    public AjaxResult deleteFile(@PathVariable(name = "fileName") String fileName) throws FileNotFoundException {
        File file = new File(fileUploadRootDir + fileName);
        if (file.exists() && file.delete()) {
            return AjaxResult.success("删除成功");
        }
        return AjaxResult.error("删除失败");
    }


    @GetMapping("/download/{fileName}")
    @ResponseBody
    public ResponseEntity<Object> downloadFile(@PathVariable(name = "fileName") String fileName) throws FileNotFoundException {
        File file = new File(fileUploadRootDir + fileName);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment;filename=\"%s", fileName));
        headers.add("Cache-Control", "no-cache,no-store,must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        ResponseEntity<Object> responseEntity = ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/txt"))
                .body(resource);
        return responseEntity;
    }

//    @GetMapping("/QrTest")
//    public void get(HttpServletResponse response) throws Exception {
//        int width = 200;
//        int height = 200;
//        String format = "png";
//        String content = "jwttttt";
//        ServletOutputStream out = response.getOutputStream();
//        Map<EncodeHintType,Object> config = new HashMap<>();
//        config.put(EncodeHintType.CHARACTER_SET,"UTF-8");
//        config.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
//        config.put(EncodeHintType.MARGIN, 0);
//        BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE,width,height,config);
//        MatrixToImageWriter.writeToStream(bitMatrix,format,out);
//        System.out.println("二维码生成完毕，已经输出到页面中。");
//    }


}
