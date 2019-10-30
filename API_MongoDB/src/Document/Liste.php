<?php
/**
 * Created by PhpStorm.
 * User: arino
 * Date: 30/10/2019
 * Time: 15:42
 */

namespace App\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Liste
{
    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $title;

    /** @ODM\Field(type="hash") */
    private $Composition;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }



    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getComposition()
    {
        return $this->Composition;
    }

    /**
     * @param mixed $Composition
     */
    public function setComposition($Composition)
    {
        $this->Composition = $Composition;
    }


}