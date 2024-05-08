package ecommerceServer.controller;

import java.io.IOException;
import java.util.stream.Collectors;
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
	
	@GetMapping("/file/{id}")
	public Picture getFile(@PathVariable long id) {
		Optional<Picture> picTmp = picRepo.findById(id);
		if (!picTmp.isPresent()) {
			return null;
		}
		else {
			Picture pic = picTmp.get();
			return pic;
		}
	}
	
	@PostMapping("/file/upload/{id}")
	public ResponseEntity<String> uploadFile(@PathVariable long id, @RequestParam("file") MultipartFile file) throws Exception {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if(fileName.contains("..")) {
                throw  new Exception("Filename contains invalid path sequence " + fileName);
            }
             if (file.getBytes().length > (1024 * 1024)) {
                throw new Exception("File size exceeds maximum limit");
            }
            Picture attachment = new Picture(id, fileName, file.getContentType(), file.getBytes());
            picRepo.save(attachment);
            return ResponseEntity.ok("File Uploaded");
        } catch (SizeExceededException e) {
            throw new SizeExceededException(file.getSize());
        } catch (Exception e) {
            throw new Exception("Could not save File: " + fileName);
        }
    }
}
