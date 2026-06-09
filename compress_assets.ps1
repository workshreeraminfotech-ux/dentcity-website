[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

$assetsDir = "c:\Users\karsa\OneDrive\Desktop\dentcity\dentcity website\dentcity-main\src\assets"
$backupRoot = Join-Path $assetsDir "originals_backup"

if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

# Find all image files (.jpg, .jpeg, .png) recursively
$files = Get-ChildItem -Path $assetsDir -Include "*.jpg", "*.jpeg", "*.png" -Recurse

# Filter out files in backup directory
$files = $files | Where-Object { $_.FullName -notlike "*originals_backup*" }

# Filter out files smaller than 200KB (already light)
$files = $files | Where-Object { $_.Length -gt 200000 }

# JPEG Codec Setup
$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders()
$jpegCodec = $codecs | Where-Object { $_.FormatDescription -eq "JPEG" }
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParam = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 82) # Quality = 82%
$encoderParams.Param[0] = $encoderParam

Write-Host "Found $($files.Count) image files to optimize (>200KB)."
$savedTotal = 0
$processedCount = 0

foreach ($f in $files) {
    # Determine relative path from assets directory to maintain folder structure in backup
    $relative = $f.FullName.Substring($assetsDir.Length + 1)
    $backupPath = Join-Path $backupRoot $relative
    
    # Create parent directories for backup file if they don't exist
    $backupParent = Split-Path $backupPath -Parent
    if (-not (Test-Path $backupParent)) {
        New-Item -ItemType Directory -Path $backupParent | Out-Null
    }
    
    # Backup original file if not already backed up
    if (-not (Test-Path $backupPath)) {
        Copy-Item $f.FullName $backupPath
    }
    
    try {
        # Load image
        $img = [System.Drawing.Image]::FromFile($f.FullName)
        $origWidth = $img.Width
        $origHeight = $img.Height
        $ar = $origWidth / $origHeight
        $origSize = $f.Length
        
        $isPng = $f.Extension.ToLower() -eq ".png"
        $maxSize = if ($isPng) { 1200 } else { 1920 }
        
        $targetWidth = $origWidth
        $targetHeight = $origHeight
        
        # Resize if width or height is larger than cap
        if ($origWidth -gt $maxSize) {
            $targetWidth = $maxSize
            $targetHeight = [math]::Round($maxSize / $ar)
        }
        
        # If it doesn't need resizing and is already within limits, only compress JPEGs
        if ($origWidth -le $maxSize -and $isPng) {
            # PNGs don't have lossy compression options in GDI+, only resizing reduces size significantly.
            # So if it is already small, skip it.
            $img.Dispose()
            continue
        }
        
        # Create resized bitmap
        $resized = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $g = [System.Drawing.Graphics]::FromImage($resized)
        
        # Set graphics settings for high quality scaling
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Draw original onto resized
        $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
        
        $g.Dispose()
        $img.Dispose()
        
        # Save to temp file
        $tempPath = [System.IO.Path]::GetTempFileName() + $f.Extension
        if ($isPng) {
            $resized.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $resized.Save($tempPath, $jpegCodec, $encoderParams)
        }
        $resized.Dispose()
        
        # Overwrite original
        Move-Item $tempPath $f.FullName -Force
        
        # Calculate savings
        $newSize = (Get-Item $f.FullName).Length
        $saved = $origSize - $newSize
        $savedTotal += $saved
        $processedCount++
        
        $origMB = [math]::Round($origSize / 1MB, 2)
        $newMB = [math]::Round($newSize / 1MB, 2)
        Write-Host "Optimized $($f.Name): $($origMB)MB -> $($newMB)MB (Reduced by $([math]::Round($saved / $origSize * 100))%)"
    } catch {
        Write-Host "Warning: Could not process $($f.Name). Error: $_"
    }
}

$savedMB = [math]::Round($savedTotal / 1MB, 2)
Write-Host "Completed! Processed $processedCount files. Saved $savedMB MB in total."
