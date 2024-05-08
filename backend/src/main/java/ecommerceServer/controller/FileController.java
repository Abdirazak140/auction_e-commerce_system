package ecommerceServer.controller;

import java.io.IOException;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ecommerceServer.connection.CatalogueResponse;
import ecommerceServer.entity.Picture;
import ecommerceServer.entity.Product;
import ecommerceServer.exception.SizeExceededException;
import ecommerceServer.repository.PictureRepository;

//import com.example.uploadingfiles.storage.StorageFileNotFoundException;
//import com.example.uploadingfiles.storage.StorageService;

@Controller
@RequestMapping("/api")
public class FileController {
	
	@Autowired
	private final PictureRepository picRepo;
	
	
	public FileController(PictureRepository picRepo) {
		this.picRepo = picRepo;
	}
	/*
	@GetMapping("/file/{id}")
	public byte[] getFile(@PathVariable long id) {
		System.out.println("Bean4");
		Optional<Picture> picTmp = picRepo.findById(id);
		System.out.println("Bean5");
		if (!picTmp.isPresent()) {
			System.out.println("Bean No");
			return null;
		}
		else {
			System.out.println("Bean Yes");
			Picture pic = picTmp.get();
			return pic.getPicture();
		}
	}
	*/
	
	@GetMapping("/file/all")
	public List<Picture> getAllFiles() {
		return picRepo.findAll();
	}
	
	@PostMapping("/file/upload/{id}")
	public ResponseEntity<String> uploadFile(@PathVariable long id, @RequestParam("file") MultipartFile file) throws Exception {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			System.out.println("Bean");
			if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence " + fileName);
            }
             if (file.getBytes().length > (1024 * 1024)) {
                throw new Exception("File size exceeds maximum limit");
            }
            System.out.println("Bean2");
            Picture attachment = new Picture(id, fileName, file.getContentType(), file.getBytes());
            System.out.println("Bean3");
            picRepo.save(attachment);
            return ResponseEntity.ok("File Uploaded");
        } catch (SizeExceededException e) {
            throw new SizeExceededException(file.getSize());
        } catch (Exception e) {
        	e.printStackTrace();
            throw new Exception("Could not save File: " + fileName);
        }
    }
}
