<?php

// adatok fájlba / adatbázisba
// fájl tárolás tipikusan serialize (php saját) vagy JSON
// ha elég a JSON, az jobb
// serialize kell ha pld objektum-típust is tárolni akarok

class FileStorage {
    private $path;
    private $contents;

    public function __construct($path)
    {
        if (!file_exists($path)) {
            touch($path);
            file_put_contents($path, "[]");
        }

        if (!is_readable($path) || !is_writeable($path)) {
            throw new Exception("Storage file ${path} does not exist or invalid permissions!");
        }

        $this->path = realpath($path);
        $file_contents = file_get_contents($this->path);
        $this->contents = json_decode($file_contents, TRUE);

        if (!is_array($this->contents)) {
            throw new Exception("Invalid storage file format!");
        }
    }

    public function addItem($key, $value)
    {
        $this->contents[$key] = $value;
    }
    public function getItem($key)
    {
        if (array_key_exists($key, $this->contents)) {
            return $this->contents[$key];
        }
        return null;
    }
    public function deleteItem($key)
    {
        unset($this->contents[$key]);
    }
    public function getContents()
    {
        return $this->contents;
    }
    public function getFilteredContents($function)
    {
        return array_filter($this->contents, $function);
    }

    public function __destruct()
    {
        $file_contents = json_encode($this->contents,JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
        file_put_contents($this->path, $file_contents);
    }

}