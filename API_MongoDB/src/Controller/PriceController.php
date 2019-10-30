<?php
namespace App\Controller;

use App\Document\Price;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use App\Document\Figurines;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Created by PhpStorm.
 * User: arino
 * Date: 30/10/2019
 * Time: 12:11
 */



class PriceController extends AbstractController
{
    /**
     *
     * @Route("/test", name="test")
     */
    public function test(DocumentManager $dm)
    {
        $figurines = new Figurines();
        $price = new Price();

        $figurines->setFaction("test");
        $figurines->setName("test");
        $figurines->setExpectedTime(10);
        $figurines->setStory("test");
        $figurines->setPointValue(10);
        $price->setCurrency("test");
        $price->setQuantity(10);
        $figurines->setPrice($price);

        $dm->persist($figurines);
        $dm->flush();


        return new JsonResponse(array('Status' => 'OK'));


    }

    /**
     *
     * @Route("/figurines", name="getFigurines")
     */
    public function testV(DocumentManager $dm)
    {


        $products = $dm->getRepository(Figurines::class)->findAll();
        $i = 0;
        foreach ($products as $product)
        {
            $figurines[$i]['id'] = $product->getId();
            $figurines[$i]['name'] = $product->getName();
            $figurines[$i]['Price'] = $product->getPrice();
            $figurines[$i]['ExpectedTime'] = $product->getExpectedTime();
            $figurines[$i]['Story'] = $product->getStory();
            $figurines[$i]['Faction'] = $product->getFaction();
            $figurines[$i]['pointValue'] = $product->getPointValue();
            $i++;
        }


        return new JsonResponse($figurines);


    }

}