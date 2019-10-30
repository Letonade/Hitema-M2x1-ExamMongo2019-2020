<?php
namespace App\Controller;

use App\Document\Price;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use App\Document\Figurines;
use App\Document\Liste;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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
    public function figurines(DocumentManager $dm)
    {


        $products = $dm->getRepository(Figurines::class)->findAll();
        $i = 0;
        foreach ($products as $product)
        {
            $figurines[$i]['_id'] = $product->getId();
            $figurines[$i]['name'] = $product->getName();
            $figurines[$i]['Price'] = $product->getPrice();
            $figurines[$i]['ExpectedTime'] = $product->getExpectedTime();
            $figurines[$i]['Story'] = $product->getStory();
            $figurines[$i]['Faction'] = $product->getFaction();
            $figurines[$i]['pointValue'] = $product->getPointValue();
            $i++;
        }

        $response = new JsonResponse($figurines);

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;


    }

    /**
     *
     * @Route("/addListe", name="addListe")
     *
     */
    public function addListe(Request $request, DocumentManager $dm)
    {
        $liste = new Liste();

        $title = $request->get('title');

        $anciens = $dm->getRepository(Liste::class)->findBy((['title' => $title]));

        foreach($anciens as $one)
        {
            $dm->remove($one);
        }

        $composition = $request->get('composition');

        $liste->setTitle($title);
        $liste->setComposition($composition);

        $dm->persist($liste);
        $dm->flush();

        $response = new JsonResponse("ok");

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;


    }

    /**
     *
     * @Route("/getListe", name="getListe")
     *
     */
    public function getListe(Request $request, DocumentManager $dm)
    {
        $title = $request->get('title');

        $l = $dm->getRepository(Liste::class)->findOneBy((['title' => $title]));

        $liste["title"] = $l->getTitle();
        $liste["Composition"] = $l->getComposition();

        $response = new JsonResponse($liste);

        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;


    }

}