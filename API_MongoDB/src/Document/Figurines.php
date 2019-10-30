<?php
/**
 * Created by PhpStorm.
 * User: arino
 * Date: 30/10/2019
 * Time: 09:12
 */
namespace App\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document */
class Figurines
{
    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="string") */
    private $Name;

    /** @ODM\Field(type="integer") */
    private $pointValue;

    /** @ODM\Field(type="integer") */
    private $ExpectedTime;

    /** @ODM\Field(type="string") */
    private $Story;

    /** @ODM\Field(type="string") */
    private $Faction;

    /** @ODM\Field(type="hash") */
    private $Price;

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
    public function getName()
    {
        return $this->Name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->Name = $name;
    }

    /**
     * @return mixed
     */
    public function getPointValue()
    {
        return $this->pointValue;
    }

    /**
     * @param mixed $pointValue
     */
    public function setPointValue($pointValue)
    {
        $this->pointValue = $pointValue;
    }

    /**
     * @return mixed
     */
    public function getExpectedTime()
    {
        return $this->ExpectedTime;
    }

    /**
     * @param mixed $ExpectedTime
     */
    public function setExpectedTime($ExpectedTime)
    {
        $this->ExpectedTime = $ExpectedTime;
    }

    /**
     * @return mixed
     */
    public function getStory()
    {
        return $this->Story;
    }

    /**
     * @param mixed $Story
     */
    public function setStory($Story)
    {
        $this->Story = $Story;
    }

    /**
     * @return mixed
     */
    public function getFaction()
    {
        return $this->Faction;
    }

    /**
     * @param mixed $Faction
     */
    public function setFaction($Faction)
    {
        $this->Faction = $Faction;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->Price;
    }

    /**
     * @param mixed $Price
     */
    public function setPrice($Price)
    {
        $this->Price = $Price;
    }


}

/** @ODM\Document */
class Price
{
    /** @ODM\Id */
    private $id;

    /** @ODM\Field(type="integer") */
    private $Quantity;

    /** @ODM\Field(type="string") */
    private $Currency;

    /**
     * @return mixed
     */
    public function getQuantity()
    {
        return $this->Quantity;
    }

    /**
     * @param mixed $Quantity
     */
    public function setQuantity($Quantity)
    {
        $this->Quantity = $Quantity;
    }

    /**
     * @return mixed
     */
    public function getCurrency()
    {
        return $this->Currency;
    }

    /**
     * @param mixed $Currency
     */
    public function setCurrency($Currency)
    {
        $this->Currency = $Currency;
    }


}